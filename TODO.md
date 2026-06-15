# TODO / Architecture Notes

Working notes from the discussion on structure, components, composables, and the data layer. Captures decisions so the patterns are set before the app grows. Rules in `.claude/rules/` enforce most of this; this file is the rationale and the open items.

## Structure (settled)

- Feature-based. Group by domain, not by file type. No top-level `services/`, `stores/`, `types/`, or `components/` folders.
- Per app: `router/`, `views/` (route screens), `features/` (slices), plus optional `composables/` and `lib/` for the rare app-wide cross-feature code.
- Feature slice anatomy: `features/<domain>/` with `types.ts`, `api/` (service + DTO + mapper), `model/` (store + composable), `ui/` (components). Intra-slice imports relative, `@shared` for infra.
- See `.claude/rules/architecture.md`, `features.md`, `components.md`.

## Components (settled)

- Three layers: primitives (`shared/components/ui/`, vendored shadcn, never hand-edited), composites (`shared/components/common/`, reusable across apps), feature UI (`features/<domain>/ui/`, domain-bound).
- Feature components live in the slice `ui/` segment, not an app-level `components/` folder. Placement decided by reuse, not by what a component is built from.

## Views (settled)

- Views can use all three component layers, not only feature components.
- Views are thin orchestrators: route concerns, kick off loading, compose feature UI. No HTTP, no business logic, no domain UI inline. Logic goes to feature composables and stores.

## Data layer (settled)

- One direction: service (`api/`) -> store (`model/store.ts`) -> composable (`model/use<Domain>.ts`) -> ui/view.
- Service: owns HTTP, the only place endpoint paths and the wire shape live. Returns domain types.
- Store (Pinia): pure state container. Normalized data, derived getters, dumb mutations, no HTTP. Holds persisted state (loading/loaded/fetchedAt) that must survive navigation.
- Composable: orchestration glue, wires service to store, exposes intent. Optional; if a store action does the fetch instead, it can shrink. No empty pass-through composables.
- `useApi(fn)`: generic async wrapper, one per operation so each call has its own loading flag. Ephemeral; persisted state goes in the store. Lives in `shared/composables`.

## DTO / domain split (settled)

- DTO = raw API contract, file-local to the service, never exported. Domain type = yours, in `types.ts`. Mapper (`to<Domain>`) converts DTO to domain, always hand-written.
- DTO can be generated from a backend OpenAPI/GraphQL spec; mapper and domain type stay hand-written. Needs the Laravel side to publish a spec, otherwise hand-write the DTO.

## Shared vs app (settled)

- Share mechanism, not meaning. `shared/` holds `http`, `useApi`, generic UI composables, and the `ui`/`common` component layers.
- Domain code is per app. Bookmarks is fully separated: app and admin each own type, DTO, service, store, composable, UI. No shared bookmark code.
- Standard backing this: group by feature, prefer duplication over a premature shared abstraction between diverging consumers. Shared domain types are justified only for a single stable contract (ideally generated).

## Slice boundaries (settled)

- Own lifecycle = own slice. Categories and tags are separate slices, not folded into bookmarks. A bookmark references them by type (`bookmark.category`, `bookmark.tags`), one-directional import.
- Sub-actions stay in the owning slice. Favoriting lives in `features/bookmarks/api`, one method until it grows a cluster (then `api/favorites.ts`). Path shape never drives file structure.
- Circular feature imports -> extract shared models to an `entities/` layer. Not needed yet.

## Rejected / deferred

- No generic `useStore`/`apiStore` composable wrapping Pinia. For repeated store boilerplate use a typed store factory (`createResourceStore<T>`), built on the rule of three with escape hatches. Deferred until stores repeat.
- No shared base bookmark type with admin extending it. Chosen full separation per app.

## Open decisions

- Caching: hand-rolled store fields (loaded/fetchedAt) suffice for "keep last data + loading." For real cache semantics (keys, invalidation, background refetch, dedupe), evaluate a query layer (Pinia Colada or TanStack Query) before hand-rolling. Decide before stores multiply.
- State/data library: Pinia added. Confirm it stays standard. Query layer (Colada) still open.
- DTO codegen: only if the API publishes an OpenAPI spec. Otherwise hand-write.

## Follow-ups

- Run `./run install` to install Pinia (in `package.json`, not yet installed). `vue-tsc` will error on Pinia imports until then.
- Bookmark slices are reference scaffolding: `BookmarkList`/`BookmarkRow` are simple divs, endpoints (`/bookmarks`, `/admin/bookmarks`) and `VITE_API_URL` are illustrative, no backend exists. Nothing consumes the slices in a view yet.

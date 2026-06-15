# TODO / Architecture Notes

Working notes from the discussion on views, components, composables, and stores. Captures decisions and open items so the patterns are set before the app grows.

## Component layers (settled)

- Three layers: primitives (`shared/components/ui/`, vendored shadcn, never hand-edited), composites (`shared/components/common/`, reusable, built from primitives), feature (app-level in `app/src/components/` or `admin/src/components/`).
- There is no folder named `feature`. The app's own `src/components/` is the feature layer. Group feature components by domain subfolder from the start (e.g. `app/src/components/bookmarks/`).
- Placement is decided by reuse, not by what a component is built from or how large it is. A fat widget is still `common/` if shared, app-level if app-bound. Composites stack with no depth limit.
- Captured in `.claude/rules/components.md` and the external doc `04 - Component Architecture.md`.

## Views (settled)

- Views can use all three layers, not only feature components. The layering rule governs where components live, not what a view may import.
- Views are thin orchestrators. They handle route concerns (read params, kick off loading), compose feature components, and pass props/handlers down.
- No major logic in views. Data fetching, mutations, derived state, and business rules go into composables and stores. A healthy view reads like a table of contents: fetch, then compose.
- Domain UI belongs in feature components, not inline in the view template.

## Data layer (settled)

- Four layers, one direction. Service (HTTP) -> store (state) -> composable (orchestration) -> component/view (render).
- Service: owns HTTP, one module per resource, the only place endpoint paths and fetch/axios live.
- Store (Pinia): pure state container. Normalized data, derived getters, dumb mutations. No HTTP, transport-agnostic. Holds persisted state that must survive navigation (loading/loaded/fetchedAt live here, not in a component-scoped composable).
- Composable (`use*`): orchestration glue. Wires service to store, exposes intent. Optional, add only when there is real orchestration. If a store action does the fetch instead, the composable can shrink or vanish; do not create empty pass-through composables.
- `useApi(fn)`: generic async wrapper returning data/loading/error/execute. One instance per operation so each call has its own loading flag. For ephemeral calls; persisted state goes in the store.

## Composables are not all resource fetchers

- Resource composables (`useBookmarks`) are one category. Others: UI/behavior (`useModal`, `useDebounce`), cross-cutting logic (`useAuth`, `usePermissions`), small utilities (often from VueUse).

## Rejected / deferred

- No generic `useStore` or `apiStore` composable wrapping Pinia. Pinia is already the consistency layer; wrapping it fights typing and devtools.
- For repeated store boilerplate, use a typed store factory (`createResourceStore<T>(id, api)`), not a runtime wrapper. Build it on the rule of three (after the third near-identical store) and give it escape hatches for per-resource getters/actions. Deferred until resources actually repeat.
- `useApi`: prefer wrapping VueUse `useAsyncState` / `useFetch` over hand-rolling if reaching for more features. Current example is hand-rolled and dependency-free.

## Open decisions

- Caching semantics: hand-rolled store fields (loaded/fetchedAt) are enough for "keep last data + loading per resource." If real cache semantics are needed (keys, invalidation, background refetch, dedupe), evaluate a query layer (Pinia Colada, the official Pinia data layer, or TanStack Query) before hand-rolling. Decide before stores multiply.
- State library: Pinia added for the example. Confirm it stays as the standard.

## Follow-ups

- Run `./run install` (or `./run yarn install`) to install Pinia (added to `package.json`, not yet installed).
- Example bookmark stack is wired but not consumed by any view yet. Add a demo view/feature component if a runnable example is wanted.
- The bookmark API endpoints (`/bookmarks`, `/bookmarks/:id/favorite`) and `VITE_API_URL` are illustrative; no backend exists.

---
description: Component organization and placement (ui / common / feature)
globs:
  - shared/components/**
  - app/src/components/**
  - admin/src/components/**
alwaysApply: false
---

# Component Organization

Three layers. Decide placement first, then structure.

## Layers

1. **Primitives** - `shared/components/ui/`
   - shadcn-owned, vendored. Treat as generated code.
   - Never add app-specific logic (icon flags, business variants) here. It gets overwritten on shadcn re-sync and these must stay generic.
   - If shadcn already exposes the variation via a prop or cva variant, use it. Do not wrap.

2. **Composites** - `shared/components/common/`
   - Reusable components built from primitives (e.g. Button + Icon).
   - The composition contract lives here so primitives stay generic.

3. **Feature** - app-level, in `app/src/components/` or `admin/src/components/`
   - Tied to one screen or domain. Not reusable, not shared.
   - There is no folder named `feature`. The app's own `src/components/` is the feature layer. Anything there is a feature component by virtue of being app-local and not in `shared/`.
   - Group by domain subfolder from the start (e.g. `app/src/components/bookmarks/`), not flat files. This is a reference codebase, so establish the feature-based structure early rather than flat-then-migrate.

## Placement rule

Placement is decided by reuse, not by what a component is built from or how large it is. A fat widget composed of primitives and composites is still `common/` if shared, or app-level if app-bound.

- Built on a primitive and reusable -> composite in `common/`. Never edit the primitive.
- A variation a primitive already supports via props/variants -> use the variant.
- Specific to one app or domain -> app-level feature folder.
- Composites stack. `common/` may compose `ui/` and other `common/` components, no depth limit.
- Do not wrap prematurely. Inline a one-off `<Button><Icon/></Button>`. Promote to a `common/` composite when the same composition repeats or carries real logic.

## File structure

- **ui/**: keep the shadcn structure as generated (folder + `Component.vue` + `index.ts` with cva variants and barrel export). Leave it alone.
- **common/**: default to a single flat `.vue` file. No folder, no `index.ts`. Promote to a folder + `index.ts` only when it grows sub-components or its own variants/composable worth co-locating (e.g. `common/DataTable/` with sub-parts). Do not add an `index.ts` for a single-file component.
- **feature**: group by domain subfolder (e.g. `app/src/components/bookmarks/`). A single `.vue` per component inside that folder is fine; the same promote-to-its-own-folder rule applies once one grows sub-parts.

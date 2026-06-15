---
description: Component organization and placement (ui / common / feature ui)
globs:
  - shared/components/**
  - app/src/features/**
  - admin/src/features/**
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

3. **Feature** - inside the slice, `<app>/src/features/<domain>/ui/`
   - Tied to one domain. Not reusable, not shared. Lives in its feature slice's `ui/` segment, not a top-level `components/` folder.
   - There is no app-level `components/` folder. Feature UI is colocated with its data layer under `features/<domain>/`. See `features.md` for the slice anatomy.

## Placement rule

Placement is decided by reuse, not by what a component is built from or how large it is. A fat widget composed of primitives and composites is still `common/` if shared across apps, or a feature `ui/` component if domain-bound.

- Built on a primitive and reusable across both apps -> composite in `shared/components/common/`. Never edit the primitive.
- A variation a primitive already supports via props/variants -> use the variant.
- Specific to one domain -> the feature slice's `ui/` segment.
- Composites stack. `common/` may compose `ui/` and other `common/` components, no depth limit.
- Do not wrap prematurely. Inline a one-off `<Button><Icon/></Button>`. Promote to a `common/` composite when the same composition repeats across apps or carries real logic.

## File structure

- **ui/** (shared primitives): keep the shadcn structure as generated (folder + `Component.vue` + `index.ts` with cva variants and barrel export). Leave it alone.
- **common/** (shared composites): default to a single flat `.vue` file. No folder, no `index.ts`. Promote to a folder + `index.ts` only when it grows sub-components or its own variants/composable worth co-locating (e.g. `common/DataTable/` with sub-parts). Do not add an `index.ts` for a single-file component.
- **feature ui/**: flat `.vue` files inside the slice's `ui/` segment (e.g. `features/bookmarks/ui/BookmarkList.vue`). The view imports the feature's composable from `model/`; UI never calls the service or holds persisted state.

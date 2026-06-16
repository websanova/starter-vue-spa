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
- Placement is reuse, never what a component is built from. `Cover` composing nothing, `CoverLoading` composing `Cover`, and `ButtonIcon` composing two `ui/` primitives all land in `common/` because all three are shared across apps.

## File structure

Always folders, never flat files. One component, one folder, from day one, single file or not. No promote-later. A consistent folder shape keeps the tree sorted and avoids rename churn when a component later grows sub-parts.

Casing signals ownership. kebab = vendored/generated, leave it alone. PascalCase = authored by you. Files are always PascalCase in both layers (Vue style guide); only the folder casing differs, because the folder owner differs.

- **ui/** (shared primitives): keep the shadcn structure as generated (kebab folder + `Component.vue` + `index.ts` with cva variants and barrel export, e.g. `ui/button/`). Vendored, leave it alone.
- **common/** (shared composites): one PascalCase folder per component, always, with an `index.ts` barrel even for a single file (e.g. `common/Cover/` holding `Cover.vue` + `index.ts`). Multi-part components add siblings in the same folder (`common/Dialog/` with `Dialog.vue` + `DialogClose.vue`).
- **feature ui/**: flat PascalCase `.vue` files inside the slice's `ui/` segment (e.g. `features/bookmarks/ui/BookmarkList.vue`). The view imports the feature's composable from `model/`; UI never calls the service or holds persisted state.

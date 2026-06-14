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
   - Never add app-specific logic (icon flags, business variants) here. It gets
     overwritten on shadcn re-sync and these must stay generic.
   - If shadcn already exposes the variation via a prop or cva variant, use it.
     Do not wrap.

2. **Composites** - `shared/components/common/`
   - Reusable components built from primitives (e.g. Button + Icon).
   - The composition contract lives here so primitives stay generic.

3. **Feature** - `<app>/src/components/<feature>/`
   - Tied to one screen or domain. Not reusable, not shared.

## Placement rule

- Built on a primitive and reusable -> composite in `common/`. Never edit the
  primitive.
- A variation a primitive already supports via props/variants -> use the variant.
- Used once and domain-specific -> feature folder.
- Do not wrap prematurely. Inline a one-off `<Button><Icon/></Button>`. Promote to
  a `common/` composite when the same composition repeats or carries real logic.

## File structure

- **ui/**: keep the shadcn structure as generated (folder + `Component.vue` +
  `index.ts` with cva variants and barrel export). Leave it alone.
- **common/ and feature/**: default to a single flat `.vue` file. No folder, no
  `index.ts`.
- Promote a `common/`/`feature/` component to a folder + `index.ts` only when it
  grows sub-components or its own variants/composable worth co-locating. Do not
  add an `index.ts` for a single-file component.

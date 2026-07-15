---
description: Conventions for shared components (ui primitives and common composites)
globs:
  - "shared/components/**/*.vue"
  - "shared/components/**/*.ts"
---

# Components

## ui vs common

- Primitives in `shared/components/ui/` are vendored (shadcn-vue). Do not hand-edit them.
- Build app-specific pieces as composites in `shared/components/common/`.

## cva variants

Any component that uses cva defines the variant recipe in the folder's `index.ts`, never inline in the `.vue`.

- Export the recipe as `<name>Variants` and its type as `<Name>Variants` via `VariantProps<typeof <name>Variants>`.
- The `.vue` imports both from `.` and applies `<name>Variants({ ... })` in the template.
- Keeps the recipe reusable without rendering the component, mirrors the vendored ui primitives, and copies cleanly into production.

```ts
// Foo/index.ts
import { cva, type VariantProps } from "class-variance-authority"

export { default as Foo } from "./Foo.vue"

export const fooVariants = cva(
  "...",
  {
    variants: {
      size: {
        sm: "...",
        md: "..."
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

export type FooVariants = VariantProps<typeof fooVariants>
```

```vue
<!-- Foo/Foo.vue -->
<script setup lang="ts">
  import { type FooVariants, fooVariants } from "."

  defineProps<{
    size?: FooVariants["size"]
  }>()
</script>

<template>
  <div :class="fooVariants({ size })">
    <slot />
  </div>
</template>
```

## class passthrough

Add a `class?: HTMLAttributes["class"]` prop merged with `cn(...)` only when callers are meant to style the component per instance (see NavItem, NavDropdown). Do not add it speculatively to components whose styling is already fully owned by their own props.

Never add a `class` prop, `cn()`, tailwind-merge, or any class-merging passthrough to a component on your own. Not for conflict handling, not for consistency, not "to be safe". Plain fallthrough only. Redundant or conflicting classes are the caller's fault, not something to guard against. Only add this if I explicitly ask for it in the same message.

## Barrels

Every component folder has an `index.ts` barrel. See `barrel-exports.md`.

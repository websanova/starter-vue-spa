---
description: Where cva variant recipes live and how they are exported
globs:
  - "shared/components/**/*.vue"
  - "shared/components/**/*.ts"
---

# CVA Variants

Any component that uses cva defines the variant recipe in the folder's `index.ts`, never inline in the `.vue`.

## Rules

- Export the recipe as `<name>Variants` and its type as `<Name>Variants` via `VariantProps<typeof <name>Variants>`.
- The `.vue` imports both from `.` and applies `<name>Variants({ ... })` in the template.
- Keeps the recipe reusable without rendering the component, mirrors the vendored ui primitives, and copies cleanly into production.

## Examples

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

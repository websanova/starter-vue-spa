---
description: Naming convention for boolean component props
globs:
  - "**/*.vue"
---

# Boolean Props

Name a boolean by what it does, not by what it is.

## Rules

- Drives a `v-if` on a child element: prefix with `show` (`showSearch`, `showCancel`, `showDismiss`)
- Toggles classes on the component's own markup: bare word (`center`, `margin`, `divider`, `condensed`)
- Reflects state rather than configuration: leave it alone (`pending`, `disabled`, `open`, `isPending`)

The test is whether an element disappears. `divider` on Heading applies `pb-2 border-b` to the `h1`, so there is no divider element and it is not `showDivider`.

Known exception: `optional` on the `FormInput*` components drives a `v-if` on the "(optional)" label, but names the field's semantics rather than the label. Left as is.

## Examples

```vue
<script setup lang="ts">
  defineProps<{
    center?: boolean
    showSearch?: boolean
  }>()
</script>

<template>
  <div :class="{ 'text-center': center }">
    <Search v-if="showSearch" />
  </div>
</template>
```

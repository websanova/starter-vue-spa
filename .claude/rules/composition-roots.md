---
description: Views and layouts name which features appear and hold no markup of their own
globs:
  - "**/views/**/*.vue"
  - "**/layouts/**/*.vue"
---

# Composition Roots

A view or layout is a composition root. It names which features appear and holds no markup of its own beyond structure.

## Rules

- Markup belongs in a feature component. If a composition root has headings, buttons, tab bars or list rendering inline, extract it to `features/<kind>/<Name>.vue`.

## Examples

```vue
<!-- views/user/bookmarks/List.vue -->
<script setup lang="ts">
  import { ref } from 'vue'
  import BookmarksHeading from '@/features/headings/Bookmarks.vue'
  import BookmarksList from '@/features/lists/Bookmarks.vue'

  const condensed = ref(false)
</script>

<template>
  <section>
    <BookmarksHeading v-model:condensed="condensed" />

    <BookmarksList :condensed="condensed" />
  </section>
</template>
```

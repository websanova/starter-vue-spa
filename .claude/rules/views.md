# Views

A view is a composition root. It names which features appear and owns the state that connects them. It holds no markup of its own beyond layout.

## Rules

- Markup belongs in a feature component. If a view has headings, buttons, or list rendering inline, extract it to `features/<kind>/<Name>.vue`.
- State shared between sibling features lives in the view. Down as props, back up with `defineModel`.
- Do not move that state into a module-scoped ref just to shrink the view. Module-scoped refs are for genuinely app-wide state like color scheme, not for two siblings that happen to share a value.
- Server params - filters, pagination - go in the route query via `usePagination`. Display state stays a view ref.

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
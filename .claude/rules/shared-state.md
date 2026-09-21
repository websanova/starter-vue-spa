---
description: Where state shared between sibling features lives
globs:
  - "**/*.vue"
---

# Shared State

State shared between sibling features lives in the composition root that renders them.

## Rules

- Down as props, back up with `defineModel`.
- Do not move that state into a module-scoped ref just to shrink the root. Module-scoped refs are for genuinely app-wide state like color scheme, not for two siblings that happen to share a value.
- Server params - filters, pagination, search - are the exception. They go in the route query, so siblings read the same value without syncing. Display state stays a local ref.

## Examples

```vue
<!-- views/user/bookmarks/List.vue - display state owned by the root -->
<script setup lang="ts">
  const condensed = ref(false)
</script>
```

```ts
// features/lists/Bookmarks.vue - server params read straight from the route
const { page, search } = usePagination()
```

---
paths:
  - "shared/views/**"
  - "shared/features/**"
  - "app/src/views/**"
  - "app/src/features/**"
  - "admin/src/views/**"
  - "admin/src/features/**"
---

# Views

- A view or layout is a composition root. It names which features appear and holds no markup of its own beyond structure.
- Markup belongs in a feature component. If a composition root has headings, buttons, tab bars or list rendering inline, extract it to `features/<kind>/<Name>.vue`.
- State shared between sibling features lives in the composition root that renders them. Down as props, back up with `defineModel`.
- Do not move shared state into a module-scoped ref just to shrink the root. Module-scoped refs are for genuinely app-wide state like color scheme, not for two siblings that happen to share a value.
- Server params (filters, pagination, search) are the exception. They go in the route query so siblings read the same value without syncing (`usePagination()` in `features/lists/Bookmarks.vue`).
- Display state stays a local ref in the root (`condensed` in `views/user/bookmarks/List.vue`).

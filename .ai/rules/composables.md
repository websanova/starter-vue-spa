---
paths:
  - "shared/composables/**"
  - "app/src/composables/**"
  - "admin/src/composables/**"
---

# Composables

- The filename tells you the export pattern. A `use*` filename has exactly one export, named the same as the file: `useCheckout.ts` exports `useCheckout` and nothing else.
- A bare filename has multiple exports, all belonging to the thing the file is named after.
- `composables/api/` and `composables/forms/` are the only folders that use bare filenames. One file per resource or model, holding every composable for it (`api/bookmarks.ts` exports `useBookmarks`, `useCreateBookmark`, `useUpdateBookmark`, `useDeleteBookmark`, and `forms/bookmarks.ts` exports `useCreateBookmarkForm`, `useUpdateBookmarkForm`, `useDeleteBookmarkForm`). Form files are named after the api file they submit to.
- Everywhere else is `use*`, one to one. If a `use*` file grows a second composable, split it (`support/useBillingAddress.ts` and `support/useBillingAddressDefaults.ts` are separate files).
- Overload signatures are one composable, not several.

---
description: How a composable filename signals its export pattern
globs:
  - "**/composables/**/*.ts"
---

# Composable Naming

The filename tells you the export pattern. It is not arbitrary.

## Rules

- `use*` filename - exactly one export, named the same as the file. `useCheckout.ts` exports `useCheckout` and nothing else.
- Bare filename - multiple exports, all belonging to the thing the file is named after.
- `composables/api/` is the only folder that uses bare filenames. One file per resource or model, holding every endpoint composable for it.
- Everywhere else is `use*`, one to one. If a `use*` file grows a second composable, split it.
- Overload signatures are one composable, not several.

## Examples

- `composables/api/bookmarks.ts` - bare. Exports `useBookmarks`, `useCreateBookmark`, `useUpdateBookmark`, `useDeleteBookmark`.
- `composables/forms/usePasswordResetForm.ts` - one export, `usePasswordResetForm`.
- `composables/support/useBillingAddress.ts` - one export. The sibling `useBillingAddressDefaults` is its own file, not grouped in.

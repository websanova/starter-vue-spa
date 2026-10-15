---
paths:
  - "shared/components/**"
  - "shared/features/**"
  - "app/src/components/**"
  - "app/src/features/**"
  - "admin/src/components/**"
  - "admin/src/features/**"
---

# Components

- CVA recipes live in the folder's `index.ts`, never inline in the `.vue`. Export the recipe as `<name>Variants` and its type as `<Name>Variants` via `VariantProps<typeof <name>Variants>`. The `.vue` imports both from `.` and applies `<name>Variants({ ... })` in the template.
- Add a `class?: HTMLAttributes["class"]` prop merged with `cn(...)` only when callers are meant to style the component per instance (see NavItem, NavDropdown). Never add a `class` prop, `cn()`, tailwind-merge, or any class-merging passthrough on your own, not for conflict handling, consistency, or "to be safe". Plain fallthrough only; redundant or conflicting classes are the caller's fault. Only add it when explicitly asked in the same message.
- Name a boolean prop by what it does, not by what it is. Drives a `v-if` on a child element: `show` prefix (`showSearch`, `showCancel`, `showDismiss`). Toggles classes on the component's own markup: bare word (`center`, `margin`, `divider`, `condensed`). Reflects state: leave it alone (`pending`, `disabled`, `open`, `isPending`).
- The boolean prop test is whether an element disappears. `divider` on Heading applies `pb-2 border-b` to the `h1`, so there is no divider element and it is not `showDivider`.
- Known exception: `optional` on the `FormInput*` components drives a `v-if` on the "(optional)" label but names the field's semantics rather than the label. Left as is.
- Primitives in `shared/components/ui/` are vendored (shadcn-vue). Do not hand-edit them.
- App-specific pieces are composites in `shared/components/common/`.

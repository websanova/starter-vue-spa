---
description: When a component may accept a class prop
globs:
  - "shared/components/**/*.vue"
  - "shared/components/**/*.ts"
---

# Class Passthrough

Add a `class?: HTMLAttributes["class"]` prop merged with `cn(...)` only when callers are meant to style the component per instance (see NavItem, NavDropdown). Do not add it speculatively to components whose styling is already fully owned by their own props.

Never add a `class` prop, `cn()`, tailwind-merge, or any class-merging passthrough to a component on your own. Not for conflict handling, not for consistency, not "to be safe". Plain fallthrough only. Redundant or conflicting classes are the caller's fault, not something to guard against. Only add this if I explicitly ask for it in the same message.

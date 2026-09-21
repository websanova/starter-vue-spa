---
description: Vendored ui primitives versus common composites
globs:
  - "shared/components/**/*.vue"
  - "shared/components/**/*.ts"
---

# Vendored UI

## Rules

- Primitives in `shared/components/ui/` are vendored (shadcn-vue). Do not hand-edit them.
- Build app-specific pieces as composites in `shared/components/common/`.

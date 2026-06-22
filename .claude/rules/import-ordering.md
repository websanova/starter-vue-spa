---
description: Import order and grouping for all source files
globs:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.jsx"
  - "**/*.vue"
alwaysApply: false
---

# Import Ordering

When editing or generating files, enforce the following import order and grouping:

1. Core / built-in modules (framework/runtime, e.g., 'vue', 'fs')
2. Third-party libraries (npm packages)
3. Application-level modules (stores, services, composables, router, state)
4. UI components (e.g., .vue)
5. Utilities / helpers (pure functions, shared logic)
6. Types / interfaces (TypeScript-only)
7. Side-effect imports (e.g., CSS/SCSS, polyfills)

Rules:
- Always group imports in the above order
- Insert exactly one blank line between each group
- Within each group, sort imports alphabetically by module path
- Prefer absolute imports (e.g., '@/...') for internal modules when available
- Do not mix groups
- Side-effect imports must always be last

Behavior:
- If imports are out of order, automatically reorder them
- If groups are mixed, separate and normalize them

Notes:
- In Vue (`<script setup>`), this ordering still applies
- Components should come after app logic but before utilities
- Types should be grouped separately when using TypeScript

Example:

```ts
import { ref } from 'vue'

import axios from 'axios'

import { useUserStore } from '@/stores/user'

import Button from '@/components/Button.vue'

import { formatDate } from '@/utils/date'

import type { User } from '@/types/user'

import '@/styles/global.css'
```
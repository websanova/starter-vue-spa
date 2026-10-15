---
paths:
  - "**/*.ts"
  - "**/*.vue"
---

# Imports

- Use aliases (`@/`, `@shared/`) whenever an import crosses a folder boundary. Use relative imports (`./`) only for files in the same folder or a subfolder of it. Never use `../`.
- Import order: core/built-in (`vue`), third-party, application modules (stores, services, composables, router, state), UI components (`.vue`), utilities/helpers, types, side-effect imports (CSS, polyfills) last.
- No blank lines between import groups. Sort alphabetically by module path within each group. Prefer absolute `@/...` for internal modules.
- The same order applies in `<script setup>`: components come after app logic but before utilities. Reorder out-of-order imports and separate mixed groups.
- Use a barrel (`index.ts`) when the folder is the unit of consumption, meaning the caller imports the folder, not a specific file inside it. Folder name is the concept (plugin, component, feature), or callers would need more than one export: barrel. Folder is just a namespace grouping independent things: no barrel. Every component folder has an `index.ts` barrel.
- `shared/plugins/http/` and `shared/components/common/Cover/` are barrels. `shared/models/` and `shared/composables/support/` are not; callers import each file directly.

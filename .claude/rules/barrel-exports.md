# Barrel Exports

Use a barrel (`index.ts`) when the folder is the unit of consumption - the caller imports the folder, not a specific file inside it.

Skip the barrel when the folder is just organization grouping independent things - the caller knows which file it wants.

## Tests

- Is the folder name the concept (plugin, component, feature)? Barrel.
- Would a caller ever need more than one export from this folder? Barrel.
- Is the folder just a namespace grouping independent things? No barrel.

## Examples

- `shared/plugins/http/` - barrel. The folder is the plugin; callers import `@shared/plugins/http`.
- `shared/components/common/Cover/` - barrel. The folder is the component; callers import `@shared/components/common/Cover`.
- `shared/models/` - no barrel. Independent one-off files; callers import `@shared/models/user` directly.
- `shared/composables/support/` - no barrel. Independent composables; callers import each file directly.

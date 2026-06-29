# Import Aliases

Use aliases (`@/`, `@shared/`) whenever an import crosses a folder boundary. Use relative imports (`./ `) only for files within the same folder or a subfolder of it. Never use `../` to go up a directory - use an alias instead.

## Rules

- Same folder or deeper: use `./` or `./subfolder/file`
- Anywhere else: use the alias (`@/`, `@shared/`, etc.)
- Never use `../` under any circumstance

## Examples

```ts
// Same folder - relative ok
import { something } from './utils'
import { interceptor } from './interceptors/auth'

// Different folder - alias required
import { useAuth } from '@shared/composables/support/auth'
import { useUserStore } from '@/stores/user'
```

import { useAuth } from '@shared/composables/services/auth'
import { useSettings } from '@shared/composables/services/settings'

/**
 * Ready gate. Resolves app critical state before any downstream guard
 * runs. Auth and settings are independent so they load in parallel, and
 * the flag checks make every navigation after the first a no-op.
 */
export async function beforeEach(): Promise<void> {
  const auth = useAuth()
  const settings = useSettings()

  await Promise.all([
    auth.isReady.value ? undefined : auth.checkReady(),
    settings.isLoaded.value ? undefined : settings.load(),
  ])
}

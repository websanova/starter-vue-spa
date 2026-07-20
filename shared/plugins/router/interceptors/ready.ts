import { settings as config } from '@/config/settings'
import { useAuth } from '@shared/composables/services/auth'
import { useI18n } from '@shared/composables/services/i18n'
import { useSettings } from '@shared/composables/services/settings'
import type { Locale } from '@shared/plugins/i18n'

/**
 * Ready gate. Resolves app critical state before any downstream guard
 * runs. Auth and settings are independent so they load in parallel, and
 * the flag checks make every navigation after the first a no-op.
 */
export async function beforeEach(): Promise<void> {
  const auth = useAuth()
  const settings = useSettings()

  await Promise.all([
    (async () => {
      if (!auth.isReady.value) await auth.checkReady()

      const locale = auth.user.value?.locale

      if (locale && locale !== config.defaultLocale) {
        useI18n().switchLocale(locale as Locale)
      }
    })(),
    settings.isLoaded.value ? undefined : settings.load(),
  ])
}

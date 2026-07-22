import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@shared/stores/auth'

/**
 * Formats a UTC date/time value in the current user's saved timezone
 * using the shared vue-i18n named formats. The active locale is
 * resolved by vue-i18n, so only the timezone is injected here.
 */
export function useDateTime() {
  const { d } = useI18n()
  const store = useAuthStore()

  return (value: Date | string | number, key = 'short') =>
    d(new Date(value), { key, timeZone: store.user!.timezone })
}

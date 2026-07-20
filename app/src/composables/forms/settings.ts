import { settings } from '@/config/settings'
import { useI18nService } from '@shared/composables/services/i18n'
import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { UserRules } from '@shared/rules/user'
import { useAuthStore } from '@shared/stores/auth'
import { useUpdateProfile } from '@/composables/api/profile'
import type { Locale } from '@shared/plugins/i18n'

export function useSettingsLocaleForm() {
  const store = useAuthStore()
  const update = useUpdateProfile()
  const { switchLocale } = useI18nService()

  return useValidatedForm({
    rules: {
      locale: UserRules.locale(),
      timezone: UserRules.timezone(),
    },
    initial: {
      locale: store.user?.locale ?? settings.defaultLocale!,
      timezone: (store.user?.timezone ?? 'America/New_York') as 'America/New_York' | 'America/Chicago' | 'America/Denver' | 'America/Los_Angeles' | 'Europe/London',
    },
    onSubmit: update.mutateAsync,
    onSuccess: (values) => switchLocale(values.locale as Locale),
  })
}

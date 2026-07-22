import { useQueryClient } from '@tanstack/vue-query'
import { settings } from '@/config/settings'
import { useI18nService } from '@shared/composables/services/i18n'
import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { UserRules } from '@shared/rules/user'
import { useAuthStore } from '@shared/stores/auth'
import { useUpdateProfile } from '@/composables/api/profile'
import type { Locale } from '@shared/plugins/i18n'

export function useSettingsLocaleForm() {
  const store = useAuthStore()
  const queryClient = useQueryClient()
  const update = useUpdateProfile()
  const { switchLocale } = useI18nService()

  const initial = {
    locale: store.user?.locale ?? settings.defaultLocale!,
    timezone: store.user?.timezone ?? settings.defaultTimezone!,
  }

  return useValidatedForm({
    rules: {
      locale: UserRules.locale(),
      timezone: UserRules.timezone(),
    },
    initial,
    onSubmit: update.mutateAsync,
    onSuccess: (values) => {
      switchLocale(values.locale as Locale)

      if (values.locale !== initial.locale) {
        queryClient.invalidateQueries({ queryKey: ['timezones'] })
      }
    },
  })
}
import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { UserRules } from '@shared/rules/user'
import { useAuthStore } from '@shared/stores/auth'
import { useUpdateProfile } from '@/composables/api/profile'

export function useSettingsLocaleForm() {
  const store = useAuthStore()
  const update = useUpdateProfile()

  return useValidatedForm({
    rules: {
      locale: UserRules.locale(),
      timezone: UserRules.timezone(),
    },
    initial: {
      locale: (store.user?.locale ?? 'en-US') as 'en-US' | 'en-CA',
      timezone: (store.user?.timezone ?? 'America/New_York') as 'America/New_York' | 'America/Chicago' | 'America/Denver' | 'America/Los_Angeles' | 'Europe/London',
    },
    onSubmit: update.mutateAsync,
  })
}

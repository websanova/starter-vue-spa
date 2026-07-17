import { useValidatedForm } from '@shared/composables/support/useValidatedForm'
import { UserRules } from '@shared/rules/user'
import { useAuthStore } from '@shared/stores/auth'
import { useUpdateProfile } from './api'

export function useProfileForm() {
  const store = useAuthStore()
  const update = useUpdateProfile()

  return useValidatedForm({
    rules: {
      first_name: UserRules.firstName(),
      last_name: UserRules.lastName(),
    },
    initial: {
      first_name: store.user?.firstName ?? '',
      last_name: store.user?.lastName ?? '',
    },
    onSubmit: update.mutateAsync,
  })
}

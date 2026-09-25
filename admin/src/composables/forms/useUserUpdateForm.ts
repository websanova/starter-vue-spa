import { useUpdateUser } from '@/composables/api/users'
import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { UserRules } from '@shared/rules/user'
import type { User } from '@/models/user'

export function useUserUpdateForm(user: User) {
  const update = useUpdateUser(user.id)

  return useValidatedForm({
    rules: {
      first_name: UserRules.firstName(),
      last_name: UserRules.lastName(),
    },
    initial: {
      first_name: user.firstName,
      last_name: user.lastName,
    },
    onSubmit: update.mutateAsync,
  })
}

import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { UserRules as SharedUserRules } from '@shared/rules/user'
import { useDeleteUser, useUpdateUser } from '@/composables/api/users'
import { UserRules } from '@/rules/user'
import type { User } from '@/models/user'

export function useUserUpdateForm(user: User) {
  const update = useUpdateUser(user.id)

  return useValidatedForm({
    rules: {
      first_name: SharedUserRules.firstName(),
      last_name: SharedUserRules.lastName(),
    },
    initial: {
      first_name: user.firstName,
      last_name: user.lastName,
    },
    onSubmit: update.mutateAsync,
  })
}

export function useUserDeleteForm(user: User, onSuccess?: () => void) {
  const mutation = useDeleteUser(user.id)

  return {
    ...useValidatedForm({
      rules: {
        email: UserRules.confirmEmail(user.email),
      },
      initial: {
        email: '',
      },
      onSubmit: mutation.mutateAsync,
      onSuccess,
    }),
    error: useMutationError(mutation),
  }
}

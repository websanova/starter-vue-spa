import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { useDeleteUser } from '@/composables/api/users'
import { UserRules } from '@/rules/user'
import type { User } from '@/models/user'

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

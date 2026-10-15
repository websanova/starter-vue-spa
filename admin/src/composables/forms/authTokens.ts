import { useMutationAction } from '@shared/composables/primitives/useMutationAction'
import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useDeleteAuthToken } from '@/composables/api/authTokens'
import type { AuthToken } from '@/models/authToken'

export function useDeleteAuthTokenForm(userId: number, authToken: AuthToken, onSuccess?: () => void) {
  const mutation = useDeleteAuthToken(userId)

  return {
    ...useMutationAction({
      onSubmit: () => mutation.mutateAsync(authToken.id),
      onSuccess,
    }),
    error: useMutationError(mutation),
  }
}

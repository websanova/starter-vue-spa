import { useMutationAction } from '@shared/composables/primitives/useMutationAction'
import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useDeleteOAuthToken } from '@/composables/api/oauthTokens'
import type { OAuthToken } from '@/models/oauthToken'

export function useDeleteOAuthTokenForm(userId: number, oauthToken: OAuthToken, onSuccess?: () => void) {
  const mutation = useDeleteOAuthToken(userId)

  return {
    ...useMutationAction({
      onSubmit: () => mutation.mutateAsync(oauthToken.id),
      onSuccess,
    }),
    error: useMutationError(mutation),
  }
}

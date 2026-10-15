import { useOAuthConsentDecision } from '@shared/composables/api/oauth'
import { useMutationError } from '@shared/composables/primitives/useMutationError'
import type { LocationQuery } from 'vue-router'

export function useOAuthConsentForm(query: LocationQuery) {
  const decision = useOAuthConsentDecision(query)

  function submit(approve: boolean) {
    decision.mutate(approve, {
      onSuccess: (redirectUri) => {
        window.location.href = redirectUri
      },
    })
  }

  return {
    error: useMutationError(decision),
    isPending: decision.isPending,
    submit,
  }
}

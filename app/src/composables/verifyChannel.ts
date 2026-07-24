import { computed } from 'vue'
import { useAuthService } from '@shared/composables/services/auth'

/**
 * Resolves the active verification channel, the first channel still
 * listed as required on the user. Refetching the user after a verify
 * advances it, since the verified channel drops off the list.
 */
export function useVerifyChannel() {
  const auth = useAuthService()

  const channel = computed(() => auth.user.value?.verificationRequired?.[0] ?? '')

  return { channel }
}

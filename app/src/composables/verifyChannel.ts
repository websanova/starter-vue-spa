import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthService } from '@shared/composables/services/auth'

/**
 * Resolves the active verification channel. A valid channel query param
 * wins, which is how a pending verification is opened from a notification.
 * Otherwise it falls back to the first required channel, and refetching
 * the user after a verify advances it as that channel drops off the list.
 */
export function useVerifyChannel() {
  const route = useRoute()
  const auth = useAuthService()

  const channel = computed(() => {
    const user = auth.user.value
    if (!user) return ''

    const allowed = [...user.verificationRequired, ...user.verificationPending]
    const query = route.query.channel

    return typeof query === 'string' && allowed.includes(query)
      ? query
      : user.verificationRequired[0] ?? ''
  })

  return { channel }
}

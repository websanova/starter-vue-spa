import { useAuthService } from '@shared/composables/services/auth'
import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'

/**
 * Forces unverified users onto the verification confirm route. Runs after
 * the auth guard, so any route that reaches here as gated already has a
 * logged in user. A route is gated when it carries auth meta that is not
 * guest only (roles other than false). The confirm route is exempt since
 * it is the redirect target. The reverse also holds, a user with nothing
 * left to verify who lands on the confirm route is sent to user landing.
 * Pending verifications are allowed to stay, so they can be confirmed
 * voluntarily from a notification.
 */
export function beforeEach(to: RouteLocationNormalized): RouteLocationRaw | undefined {
  const auth = useAuthService()

  let gated = false

  to.matched.forEach((matched) => {
    if (matched.meta.auth && matched.meta.auth.roles !== false) {
      gated = true
    }
  })

  if (
    gated &&
    auth.user.value?.isVerificationRequired &&
    to.name !== 'auth-verify-account'
  ) {
    return { name: 'auth-verify-account' }
  }

  if (
    auth.user.value &&
    !auth.user.value.isVerificationRequired &&
    !auth.user.value.verificationPending.includes(to.query.channel as string) &&
    to.name === 'auth-verify-account'
  ) {
    return { name: 'user-landing' }
  }
}

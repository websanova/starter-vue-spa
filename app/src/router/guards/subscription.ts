import { useAuthService } from '@shared/composables/services/auth'
import type { RouteLocationRaw } from 'vue-router'

const redirect: RouteLocationRaw = { name: 'user-account-billing' }

/**
 * Guards a route that only makes sense for a user without a subscription,
 * such as opening a first checkout.
 */
export function requireUnsubscribed(): RouteLocationRaw | undefined {
  const auth = useAuthService()

  if (auth.user.value?.isSubscribed) {
    return redirect
  }
}

/**
 * Guards a route that acts on an existing subscription. A cancelled
 * subscription still counts until its grace period ends, so resuming
 * stays reachable.
 */
export function requireActiveSubscription(): RouteLocationRaw | undefined {
  const auth = useAuthService()

  if (!auth.user.value?.isSubscribed) {
    return redirect
  }
}

/**
 * Guards a route that only applies to a subscription already cancelled
 * and running out its grace period.
 */
export function requireCancelled(): RouteLocationRaw | undefined {
  const auth = useAuthService()

  if (!auth.user.value?.isOnGracePeriod) {
    return redirect
  }
}

/**
 * Guards a route that cannot act on a subscription already cancelled,
 * since there is nothing left to change until it is resumed.
 */
export function requireNotCancelled(): RouteLocationRaw | undefined {
  const auth = useAuthService()

  if (auth.user.value?.isOnGracePeriod) {
    return redirect
  }
}

import { useAuthService } from '@shared/composables/services/auth'
import type { RouteLocationRaw } from 'vue-router'

const redirect: RouteLocationRaw = { name: 'user-account-billing' }

/**
 * Guards the billing address page. Subscribe collects the first address
 * through its own session element, so there is nothing to edit until
 * one is on file and the page would come up empty.
 */
export function requireBillingAddress(): RouteLocationRaw | undefined {
  const auth = useAuthService()

  if (!auth.user.value?.isBillingAddress) {
    return redirect
  }
}

/**
 * Guards the payment method page. The card being replaced was entered
 * during subscribe, so a user without one has nothing to swap and the
 * page has no intent to open for them.
 */
export function requirePaymentMethod(): RouteLocationRaw | undefined {
  const auth = useAuthService()

  if (!auth.user.value?.hasPaymentMethod) {
    return redirect
  }
}

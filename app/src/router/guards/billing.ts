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

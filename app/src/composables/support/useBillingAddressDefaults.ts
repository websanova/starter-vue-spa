import { computed } from 'vue'
import { useAuthService } from '@shared/composables/services/useAuthService'

/**
 * The address on file, shaped for what the Stripe address element takes
 * as its starting values. A prefill and nothing more, whatever the user
 * leaves in the element at submit is what counts.
 *
 * The billing name falls back to the account name, since the element
 * always renders a name field and there is no turning it off. Once one
 * has been saved that is what comes back, because who pays is not
 * necessarily whose account it is.
 */
export function useBillingAddressDefaults() {
  const auth = useAuthService()

  return computed(() => {
    const user = auth.user.value
    const value = user?.billingAddress

    if (!user || !value) {
      return null
    }

    return {
      name: value.name || [user.firstName, user.lastName].filter(Boolean).join(' '),
      address: {
        city: value.city,
        country: value.country,
        line1: value.line1,
        line2: value.line2 ?? '',
        postal_code: value.postalCode,
        state: value.state ?? '',
      },
    }
  })
}

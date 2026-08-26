import { computed } from 'vue'
import { useAuthService } from '@shared/composables/services/auth'

/**
 * The billing address as one line. The wizard summary and the billing
 * page show the same thing, so the field order lives in one place.
 */
export function useBillingAddress() {
  const auth = useAuthService()

  return computed(() => {
    const value = auth.user.value?.billingAddress

    if (!value) {
      return ''
    }

    return [value.line1, value.line2, value.city, value.postalCode, value.country]
      .filter(Boolean)
      .join(', ')
  })
}

/**
 * The card on file, shaped for the message that names it. Null is a
 * customer with nothing stored, which reads differently everywhere it
 * shows and is left to the caller.
 */
export function usePaymentMethod() {
  const auth = useAuthService()

  return computed(() => {
    const value = auth.user.value?.paymentMethod

    if (!value) {
      return null
    }

    return {
      brand: value.brand.charAt(0).toUpperCase() + value.brand.slice(1),
      last_four: value.lastFour,
    }
  })
}

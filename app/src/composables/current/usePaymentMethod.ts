import { computed } from 'vue'
import { useAuthService } from '@shared/composables/services/useAuthService'

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

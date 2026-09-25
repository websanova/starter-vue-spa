import { computed } from 'vue'
import { useAuthService } from '@shared/composables/services/useAuthService'

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

    return [value.line1, value.line2, value.city, value.state, value.postalCode, value.country]
      .filter(Boolean)
      .join(', ')
  })
}

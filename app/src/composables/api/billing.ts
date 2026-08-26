import { useMutation } from '@tanstack/vue-query'
import { useAuthService } from '@shared/composables/services/auth'
import { useHttp } from '@shared/plugins/http'

interface UpdateBillingAddressData {
  city: string
  country: string
  line1: string
  line2?: string
  postal_code: string
}

/**
 * Settles the billing address. The API pushes it to Stripe before it
 * writes anything locally, so an address Stripe cannot place comes back
 * as an error and leaves the stored one alone. Nothing is charged and
 * there is nothing to poll, the response is the answer.
 *
 * The user is refetched rather than read off the response, since the
 * wizard decides which step to open from it and has to be looking at
 * the address that was just written.
 */
export function useUpdateBillingAddress() {
  const { fetchUser } = useAuthService()

  return useMutation({
    mutationFn: async (data: UpdateBillingAddressData) => {
      await useHttp().put('billing/address', data)
      await fetchUser()
    },
  })
}

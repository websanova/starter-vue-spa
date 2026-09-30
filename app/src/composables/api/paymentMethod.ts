import { useMutation } from '@tanstack/vue-query'
import { useAuthService } from '@shared/composables/services/useAuthService'
import { useHttp } from '@shared/plugins/http'
import { toPaymentMethodIntent } from '@/models/paymentMethod'
import type { PaymentMethodIntentDto } from '@/models/paymentMethod'

interface SyncPaymentMethodData {
  setup_intent: string
}

interface UpdateBillingAddressData {
  city: string
  country: string
  line1: string
  line2?: string
  name: string
  postal_code: string
  state?: string
}

/**
 * Opens the setup intent the payment element mounts against. It carries
 * no amount and nothing about the plan, since a setup intent only ever
 * stores a payment method. Every pass creates a new one, and an
 * unconfirmed intent holds no money and no subscription, so there is
 * nothing to deduplicate and nothing to clean up.
 */
export function useCreatePaymentMethodIntent() {
  return useMutation({
    mutationFn: async () => {
      const res = await useHttp().post<{ data: PaymentMethodIntentDto }>('payment-method/intent')
      return toPaymentMethodIntent(res.data)
    },
  })
}

/**
 * Removes the payment method on file. No body, the card is resolved
 * from the user on the API side. Nothing is charged and nothing
 * settles afterwards, so the response is the answer. The user is
 * refetched after, since the billing page reads the card off it.
 */
export function useDeletePaymentMethod() {
  const { fetchUser } = useAuthService()

  return useMutation({
    mutationFn: async () => {
      await useHttp().delete('payment-method')
      await fetchUser()
    },
  })
}

/**
 * Turns a confirmed setup intent into the payment method on file. A
 * confirmed intent only attaches the card, so without this call the
 * customer carries no default and nothing would charge it. The webhook
 * runs the same writes, this is the path that lands while the user is
 * still on the page. The user is refetched after, since the wizard
 * reads the card on file to work out where to go next.
 */
export function useSyncPaymentMethod() {
  const { fetchUser } = useAuthService()

  return useMutation({
    mutationFn: async (data: SyncPaymentMethodData) => {
      await useHttp().post('payment-method/sync', data)
      await fetchUser()
    },
  })
}

/**
 * Writes the billing address to the customer at Stripe. Nothing is
 * stored on our side, the customer holds it and every renewal invoice
 * computes tax off it, so there is nothing to read back and the
 * response is the answer.
 *
 * An address Stripe cannot place comes back as an error, which is what
 * makes this the call the payment method page runs before it asks for
 * an intent.
 */
export function useUpdateBillingAddress() {
  return useMutation({
    mutationFn: async (data: UpdateBillingAddressData) => {
      await useHttp().put('payment-method/address', data)
    },
  })
}

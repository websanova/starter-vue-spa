import { useMutation } from '@tanstack/vue-query'
import { useAuthService } from '@shared/composables/services/auth'
import { useHttp } from '@shared/plugins/http'
import { toPaymentMethodIntent } from '@/models/paymentMethod'
import type { PaymentMethodIntentDto } from '@/models/paymentMethod'

interface SyncPaymentMethodData {
  setup_intent: string
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

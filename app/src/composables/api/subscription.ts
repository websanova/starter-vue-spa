import { useMutation } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toSubscriptionCheckout } from '@/models/subscription'
import type { Interval } from '@/models/plan'
import type { SubscriptionCheckoutDto } from '@/models/subscription'

interface CreateSubscriptionCheckoutData {
  plan: string
  interval: Interval
}

/**
 * Opens a Stripe checkout for the chosen plan. The subscription itself is
 * created by Stripe once the checkout completes and reaches the API
 * through the webhook, so nothing here is authoritative beyond the secret
 * the embedded form mounts against.
 */
export function useCreateSubscriptionCheckout() {
  return useMutation({
    mutationFn: async (data: CreateSubscriptionCheckoutData) => {
      const res = await useHttp().post<{ data: SubscriptionCheckoutDto }>('subscription/checkout', data)
      return toSubscriptionCheckout(res.data)
    },
  })
}

import { useMutation } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toCheckoutSession } from '@/models/subscription'
import type { Interval } from '@/models/plan'
import type { CheckoutSessionDto } from '@/models/subscription'

interface CreateCheckoutSessionData {
  plan: string
  interval: Interval
}

/**
 * Opens a Stripe Checkout session for the chosen plan. The subscription
 * itself is created by Stripe once the session completes and reaches the
 * API through the webhook, so nothing here is authoritative beyond the
 * secret the embedded form mounts against.
 */
export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: async (data: CreateCheckoutSessionData) => {
      const res = await useHttp().post<{ data: CheckoutSessionDto }>('subscription', data)
      return toCheckoutSession(res.data)
    },
  })
}

import { useMutation } from '@tanstack/vue-query'
import { useHttp } from '@shared/plugins/http'
import { toSubscriptionIntent } from '@/models/subscription'
import type { Interval } from '@/models/plan'
import type { SubscriptionIntentDto } from '@/models/subscription'

interface CreateSubscriptionIntentData {
  plan: string
  interval: Interval
}

/**
 * Opens the intent the payment element confirms against, either a
 * payment intent for an immediate charge or a setup intent when the
 * card is only being stored against a trial. Asking again for the same
 * plan and interval hands back the intent already in flight rather than
 * opening a second one, so a reload or a failed attempt is safe to
 * retry. Nothing here is authoritative, the subscription only lands
 * once Stripe reports the result through the webhook.
 */
export function useCreateSubscriptionIntent() {
  return useMutation({
    mutationFn: async (data: CreateSubscriptionIntentData) => {
      const res = await useHttp().post<{ data: SubscriptionIntentDto }>('subscription/intent', data)
      return toSubscriptionIntent(res.data)
    },
  })
}

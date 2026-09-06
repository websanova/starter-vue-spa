import { useMutation } from '@tanstack/vue-query'
import { useAuthService } from '@shared/composables/services/auth'
import { useHttp } from '@shared/plugins/http'
import { toSubscriptionSession } from '@/models/subscription'
import type { Interval } from '@/models/plan'
import type { SubscriptionSessionDto } from '@/models/subscription'

interface CreateSubscriptionSessionData {
  interval: Interval
  plan: string
}

interface SyncSubscriptionData {
  session: string
}

/**
 * Cancels the subscription at the end of the current term. No body, the
 * subscription is resolved from the user on the API side. Nothing is
 * charged, nothing is refunded and nothing settles afterwards, so the
 * response is the answer. The user is refetched after, since the
 * cancelled state is spread across flags read off it everywhere.
 */
export function useCancelSubscription() {
  const { fetchUser } = useAuthService()

  return useMutation({
    mutationFn: async () => {
      await useHttp().post('subscription/cancel')
      await fetchUser()
    },
  })
}

/**
 * Opens the checkout session both elements mount against. Nothing is
 * created beyond the session itself, so a customer who abandons the
 * page leaves one that ages out on its own and there is nothing to
 * deduplicate or clean up. A customer who already carries a
 * subscription is refused here rather than handed a second one.
 */
export function useCreateSubscriptionSession() {
  return useMutation({
    mutationFn: async (data: CreateSubscriptionSessionData) => {
      const res = await useHttp().post<{ data: SubscriptionSessionDto }>('subscription/session', data)
      return toSubscriptionSession(res.data)
    },
  })
}

/**
 * Resumes a subscription cancelled inside its paid term. No body, the
 * subscription is resolved from the user on the API side. The existing
 * subscription carries on, so the plan and the interval are not picked
 * again, nothing is charged and nothing settles afterwards. The user is
 * refetched after, since the cancelled state is spread across flags
 * read off it everywhere.
 */
export function useResumeSubscription() {
  const { fetchUser } = useAuthService()

  return useMutation({
    mutationFn: async () => {
      await useHttp().post('subscription/resume')
      await fetchUser()
    },
  })
}

/**
 * Writes the local rows once the session completes. The subscription,
 * the address and the card all come off the one session, so this is a
 * single call rather than one per row. The webhook runs the same writes
 * idempotently, this is the path that lands while the customer is still
 * on the page, and a retry is safe since everything is already correct
 * at Stripe. The user is refetched after, since subscription state is
 * read off it everywhere.
 */
export function useSyncSubscription() {
  const { fetchUser } = useAuthService()

  return useMutation({
    mutationFn: async (data: SyncSubscriptionData) => {
      await useHttp().post('subscription/sync', data)
      await fetchUser()
    },
  })
}

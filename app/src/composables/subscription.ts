import { computed } from 'vue'
import { useAuthService } from '@shared/composables/services/auth'
import type { Interval, Plan } from '@/models/plan'

export type PlanAction =
  | 'cancel'
  | 'current'
  | 'downgrade'
  | 'resume'
  | 'select'
  | 'switch'
  | 'upgrade'

/**
 * Resolves what a given plan means for the current user, which is what
 * the plan cards need to label and disable their buttons. Direction
 * comes from the tier, while identity comes from the plan id, since
 * moving between intervals on the same plan is a billing change rather
 * than a tier move and needs its own action.
 */
export function useSubscription() {
  const auth = useAuthService()

  const isPaid = computed(() => (auth.user.value?.plan?.tier ?? 0) > 0)

  const isCancelled = computed(() => auth.user.value?.isOnGracePeriod ?? false)

  function planAction(plan: Plan, interval: Interval): PlanAction {
    const user = auth.user.value

    // No plan means subscription is required and the user holds nothing
    // yet, so every plan is a fresh choice rather than a move.
    if (!user || !user.plan) {
      return 'select'
    }

    if (plan.id === user.plan.id) {
      if (isCancelled.value) {
        return 'resume'
      }

      if (user.subscription && user.subscription.interval !== interval) {
        return 'switch'
      }

      return 'current'
    }

    if (plan.tier > user.plan.tier) {
      return 'upgrade'
    }

    if (plan.tier < user.plan.tier) {
      return plan.tier === 0 ? 'cancel' : 'downgrade'
    }

    return 'select'
  }

  return {
    isCancelled,
    isPaid,
    planAction,
  }
}

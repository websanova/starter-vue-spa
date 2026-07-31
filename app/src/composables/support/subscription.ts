import { computed } from 'vue'
import { useAuthService } from '@shared/composables/services/auth'
import { useSettingsStore } from '@shared/stores/settings'
import type { Interval, Plan } from '@/models/plan'

export type PlanAction =
  | 'cancel'
  | 'current'
  | 'downgrade'
  | 'resume'
  | 'select'
  | 'subscribe'
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
  const settings = useSettingsStore()

  const hasSubscription = computed(() => !!auth.user.value?.subscription)

  const isCancelled = computed(() => auth.user.value?.isOnGracePeriod ?? false)

  const isPaid = computed(() => (auth.user.value?.plan?.tier ?? 0) > 0)

  /**
   * A trial is only ever offered once. The trial object stays set once
   * one has been started, so its absence is what marks a user as never
   * having taken one.
   */
  const isTrialEligible = computed(() =>
    settings.data.subscriptionMode === 'trial' &&
    !hasSubscription.value &&
    !auth.user.value?.trial
  )

  function planAction(plan: Plan, interval: Interval): PlanAction {
    const user = auth.user.value

    // Not reachable. The plans are only ever rendered behind auth.
    if (!user) {
      return 'select'
    }

    if (user.plan && plan.id === user.plan.id) {
      if (isCancelled.value) {
        return 'resume'
      }

      if (user.subscription && user.subscription.interval !== interval) {
        return 'switch'
      }

      return 'current'
    }

    // Covers the free tier user and the one carrying no plan at all
    // because subscription is required, neither of whom has ever paid.
    if (!hasSubscription.value && plan.tier > 0) {
      return 'subscribe'
    }

    if (!user.plan) {
      return 'select'
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
    hasSubscription,
    isCancelled,
    isPaid,
    isTrialEligible,
    planAction,
  }
}

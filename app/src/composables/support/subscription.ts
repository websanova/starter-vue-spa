import { computed } from 'vue'
import { useAuthService } from '@shared/composables/services/auth'
import { useI18n } from '@shared/plugins/i18n'
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

export type StatusAction =
  | 'cancel'
  | 'resume'
  | 'update'

export type StatusKey =
  | 'active'
  | 'cancelled'
  | 'free'
  | 'none'
  | 'trialing'

export interface StatusMessage {
  key: StatusKey
  params: Record<string, string>
}

/**
 * Resolves what a given plan means for the current user, which is what
 * the plan cards need to label and disable their buttons. Direction
 * comes from the tier, while identity comes from the plan id, since
 * moving between intervals on the same plan is a billing change rather
 * than a tier move and needs its own action.
 */
export function useSubscription() {
  const auth = useAuthService()
  const i18n = useI18n()
  const settings = useSettingsStore()

  const isSubscribed = computed(() => auth.user.value?.isSubscribed ?? false)

  const isCancelled = computed(() => auth.user.value?.isOnGracePeriod ?? false)

  const isOnTrial = computed(() => auth.user.value?.isOnTrial ?? false)

  const isPaid = computed(() => (auth.user.value?.plan?.tier ?? 0) > 0)

  /**
   * Whether anything further is going to be billed. A cancelled
   * subscription running out its paid term is not, and neither is one
   * that has ended, since isSubscribed only holds until the grace
   * period does. A trial still converts, so it counts as chargeable.
   */
  const isChargeable = computed(() => isSubscribed.value && !isCancelled.value)

  /**
   * A trial is only ever offered once. The trial object stays set once
   * one has been started, so its absence is what marks a user as never
   * having taken one.
   */
  const isTrialEligible = computed(() =>
    settings.data.subscriptionMode === 'trial' &&
    !isSubscribed.value &&
    !auth.user.value?.trial
  )

  function formatDate(value: string | null | undefined): string {
    return value ? i18n.d(new Date(value), 'short') : ''
  }

  /**
   * Picks the one sentence that describes where the user stands. The
   * order matters, since a cancelled subscription is still subscribed
   * until the grace period runs out and a trial is still active while
   * it lasts, so the narrower state has to win.
   */
  // TODO: The past_due, unpaid, incomplete, and incomplete_expired
  // statuses on SubscriptionStatus all fall through to active or none
  // here. They need their own message and a "fix payment" action once
  // the API exposes a way to retry the charge.
  const status = computed((): StatusMessage => {
    const user = auth.user.value
    const plan = user?.plan?.name ?? ''

    if (isCancelled.value) {
      return { key: 'cancelled', params: { plan, date: formatDate(user?.subscription?.endsAt) } }
    }

    if (isOnTrial.value) {
      return { key: 'trialing', params: { plan, date: formatDate(user?.trial?.endsAt) } }
    }

    if (isSubscribed.value) {
      const interval = user?.subscription?.interval

      return {
        key: 'active',
        params: { plan, interval: interval ? i18n.t(`site.units.interval.billed.${interval}`) : '' },
      }
    }

    if (user?.plan) {
      return { key: 'free', params: { plan } }
    }

    return { key: 'none', params: {} }
  })

  /**
   * The buttons that go with the current status. Each one maps to a
   * subscribe route that already guards for the same state, so the two
   * stay in agreement. Resume needs a card on file on top of that,
   * since resuming without one only defers the failure to the renewal,
   * where the invoice cannot be paid. Changing plan needs one for the
   * same reason, the difference is charged the moment it is confirmed.
   * A user with no subscription at all is picking a first plan and
   * enters their card on the way, so nothing is required of them.
   */
  const statusActions = computed((): StatusAction[] => {
    switch (status.value.key) {
      case 'cancelled':
        return auth.user.value?.hasPaymentMethod ? ['resume'] : []

      case 'active':
      case 'trialing':
        return auth.user.value?.hasPaymentMethod ? ['update', 'cancel'] : ['cancel']

      default:
        return ['update']
    }
  })

  function planAction(plan: Plan, interval: Interval): PlanAction | null {
    const user = auth.user.value

    // Not reachable. The plans are only ever rendered behind auth.
    if (!user) {
      return 'select'
    }

    /**
     * A cancelled subscription resumes onto the plan and the interval it
     * was already on, so that one card carries the only action and the
     * rest carry none at all.
     */
    if (isCancelled.value) {
      if (user.plan && plan.id === user.plan.id && user.subscription?.interval === interval) {
        return 'resume'
      }

      return null
    }

    if (user.plan && plan.id === user.plan.id) {
      if (isSubscribed.value && user.subscription && user.subscription.interval !== interval) {
        return 'switch'
      }

      return 'current'
    }

    // Covers the free tier user and the one carrying no plan at all
    // because subscription is required, neither of whom has ever paid.
    if (!isSubscribed.value && plan.tier > 0) {
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
    isCancelled,
    isChargeable,
    isOnTrial,
    isPaid,
    isSubscribed,
    isTrialEligible,
    planAction,
    status,
    statusActions,
  }
}

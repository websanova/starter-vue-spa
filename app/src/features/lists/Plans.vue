<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { usePlans } from '@/composables/api/plans'
  import { useSubscription } from '@/composables/current/useSubscription'
  import { useAuthService } from '@shared/composables/services/useAuthService'
  import { useSettingsStore } from '@shared/stores/settings'
  import PlanCard from '@/components/cards/Plan.vue'
  import { Button } from '@shared/components/ui/button'
  import { Inline } from '@shared/components/common/Inline'
  import { Load } from '@shared/components/common/Load'
  import { Stack } from '@shared/components/common/Stack'
  import type { Interval, Plan } from '@/models/plan'

  const intervals: Interval[] = ['monthly', 'yearly']

  const { data: plans, isPending, error } = usePlans()
  const { isOnTrial, isSubscribed, isTrialEligible, planAction } = useSubscription()
  const auth = useAuthService()
  const router = useRouter()
  const settings = useSettingsStore()

  const interval = ref<Interval>(auth.user.value?.subscription?.interval ?? 'monthly')

  /**
   * A subscription that is trialing cannot change plan, so the page says
   * where the trial stands and offers nothing to press. A trial with no
   * subscription behind it keeps the cards, since subscribing early
   * carries the remaining days over.
   */
  const showCards = computed(() => !(isSubscribed.value && isOnTrial.value))

  const trialEndsAt = computed(() => auth.user.value?.trial?.endsAt ?? '')

  function onCancel() {
    router.push({ name: 'user-subscribe-cancel' })
  }

  function onCheckout(plan: Plan) {
    router.push({
      name: 'user-subscribe-checkout',
      query: { plan: plan.slug, interval: interval.value },
    })
  }

  function onResume() {
    router.push({ name: 'user-subscribe-resume' })
  }

  function onUpdate(plan: Plan) {
    router.push({
      name: 'user-subscribe-update',
      query: { plan: plan.slug, interval: interval.value },
    })
  }
</script>

<template>
  <div>
    <Load
      center
      i18n-key="features.load.nouns.plans"
      :error="error"
      :is-pending="isPending"
    >
      <Stack>
        <div class="text-center">
          <p v-if="isOnTrial">
            {{ $t('features.list.plans.note_on_trial', { date: $d(new Date(trialEndsAt), 'short') }) }}
          </p>

          <p v-if="showCards">
            {{ $t('features.list.plans.note_choose') }}
          </p>

          <p
            v-if="showCards"
            class="text-sm text-muted-foreground"
          >
            {{ $t('features.list.plans.note_cancel') }}
          </p>
        </div>

        <Inline
          v-if="showCards"
          gap="sm"
          class="justify-center"
        >
          <Button
            v-for="value in intervals"
            :key="value"
            size="sm"
            :variant="interval === value ? 'solid' : 'outline'"
            @click="interval = value"
          >
            {{ $t(`site.units.interval.label.${value}`) }}
          </Button>
        </Inline>

        <Inline
          v-if="showCards"
          gap="lg"
          class="justify-center"
        >
          <PlanCard
            v-for="plan in plans"
            class="w-full sm:max-w-60"
            :key="plan.id"
            :plan="plan"
            :interval="interval"
            :action="planAction(plan, interval)"
            :trial-days="plan.isTrial && isTrialEligible ? settings.data.subscriptionTrialDays : undefined"
            @cancel="onCancel"
            @downgrade="onUpdate(plan)"
            @resume="onResume"
            @subscribe="onCheckout(plan)"
            @switch="onUpdate(plan)"
            @upgrade="onUpdate(plan)"
          />
        </Inline>
      </Stack>
    </Load>
  </div>
</template>

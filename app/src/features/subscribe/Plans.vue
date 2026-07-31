<script setup lang="ts">
  import { ref } from 'vue'
  import { usePlans } from '@/composables/api/plans'
  import { useSubscription } from '@/composables/support/subscription'
  import { useAuthService } from '@shared/composables/services/auth'
  import { useSettingsStore } from '@shared/stores/settings'
  import PlanCard from '@/components/cards/Plan.vue'
  import { Button } from '@shared/components/ui/button'
  import { Inline } from '@shared/components/common/Inline'
  import { Loading } from '@shared/components/common/Loading'
  import { Stack } from '@shared/components/common/Stack'
  import type { Interval } from '@/models/plan'

  const intervals: Interval[] = ['monthly', 'yearly']

  const { data: plans, isPending, error } = usePlans()
  const { isTrialEligible, planAction } = useSubscription()
  const auth = useAuthService()
  const settings = useSettingsStore()

  const interval = ref<Interval>(auth.user.value?.subscription?.interval ?? 'monthly')
</script>

<template>
  <div>
    <div
      v-if="isPending"
      class="flex justify-center"
    >
      <Loading />
    </div>

    <p
      v-else-if="error"
      class="text-center"
    >
      {{ error.message }}
    </p>

    <Stack v-else>
      <div class="text-center">
        <p v-if="isTrialEligible">
          {{ $t('features.subscribe.plans.note_trial', { days: settings.data.subscriptionTrialDays }) }}
        </p>

        <p v-else>
          {{ $t('features.subscribe.plans.note_choose') }}
        </p>

        <p class="text-sm text-muted-foreground">
          {{ $t('features.subscribe.plans.note_cancel') }}
        </p>
      </div>

      <Inline
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
          {{ $t(`features.subscribe.plans.toggle.${value}`) }}
        </Button>
      </Inline>

      <Inline
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
        />
      </Inline>
    </Stack>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { CheckIcon, XIcon } from '@lucide/vue'
  import { Button } from '@shared/components/ui/button'
  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@shared/components/ui/card'
  import type { PlanAction } from '@/composables/current/useSubscription'
  import type { Interval, Plan } from '@/models/plan'

  const props = defineProps<{
    plan: Plan
    interval: Interval
    action: PlanAction | null
    trialDays?: number
  }>()

  const emit = defineEmits<{
    (e: PlanAction): void
  }>()

  /**
   * A trial changes what the subscribe button says, since nothing is
   * charged when it is pressed. Every other action reads as it always did.
   */
  const label = computed(() =>
    props.trialDays && props.action === 'subscribe'
      ? 'features.list.plans.action.trial'
      : `features.list.plans.action.${props.action}`
  )
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-center text-2xl">
        {{ props.plan.name }}
      </CardTitle>

      <p class="font-bold text-center">
        <template v-if="props.plan.prices[props.interval]">
          {{ $n(props.plan.prices[props.interval]!.amount / 100, { key: 'currency', currency: props.plan.prices[props.interval]!.currency.toUpperCase() }) }}

          <span class="text-base font-normal text-muted-foreground">
            /{{ $t(`site.units.interval.short.${props.interval}`) }}
          </span>
        </template>

        <template v-else>
          {{ $t('features.list.plans.free') }}
        </template>
      </p>

      <p
        v-if="props.trialDays"
        class="text-center text-sm text-muted-foreground"
      >
        {{ $t('features.list.plans.trial', { days: props.trialDays }) }}
      </p>
    </CardHeader>

    <CardContent>
      <ul class="space-y-1">
        <li
          v-for="(value, key) in props.plan.features"
          :key="key"
          class="flex items-center justify-between"
        >
          <span>{{ $t(`features.list.plans.features.${key}`) }}</span>

          <CheckIcon v-if="value === true" />
          <XIcon v-else-if="value === false" />
          <span v-else-if="value === null">{{ $t('features.list.plans.unlimited') }}</span>
          <span v-else>{{ value }}</span>
        </li>
      </ul>
    </CardContent>

    <CardFooter v-if="props.action">
      <Button
        class="w-full"
        :disabled="props.action === 'current'"
        @click="props.action && emit(props.action)"
      >
        {{ $t(label) }}
      </Button>
    </CardFooter>
  </Card>
</template>

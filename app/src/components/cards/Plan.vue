<script setup lang="ts">
  import { CheckIcon, XIcon } from '@lucide/vue'
  import { Button } from '@shared/components/ui/button'
  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@shared/components/ui/card'
  import type { Interval, Plan } from '@/models/plan'

  const props = defineProps<{
    plan: Plan
    interval: Interval
  }>()
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
            {{ $t(`features.subscribe.plans.interval.${props.interval}`) }}
          </span>
        </template>

        <template v-else>
          {{ $t('features.subscribe.plans.free') }}
        </template>
      </p>
    </CardHeader>

    <CardContent>
      <ul class="space-y-1">
        <li
          v-for="(value, key) in props.plan.features"
          :key="key"
          class="flex items-center justify-between"
        >
          <span>{{ $t(`features.subscribe.plans.features.${key}`) }}</span>

          <CheckIcon v-if="value === true" />
          <XIcon v-else-if="value === false" />
          <span v-else-if="value === null">{{ $t('features.subscribe.plans.unlimited') }}</span>
          <span v-else>{{ value }}</span>
        </li>
      </ul>
    </CardContent>

    <CardFooter>
      <Button class="w-full">
        {{ $t('features.lbl.select') }}
      </Button>
    </CardFooter>
  </Card>
</template>

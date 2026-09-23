<script setup lang="ts">
  import { computed } from 'vue'
  import { MinusIcon, TrendingDownIcon, TrendingUpIcon } from '@lucide/vue'
  import { useI18n } from '@shared/plugins/i18n'
  import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
  import type { StatMetric } from '@/models/stat'

  const props = defineProps<{
    metric: StatMetric
  }>()

  const { n } = useI18n()

  const delta = computed(() => {
    if (props.metric.today === null || props.metric.yesterday === null) {
      return null
    }

    return props.metric.today - props.metric.yesterday
  })

  function format(value: number | null) {
    return value === null ? '-' : n(value, 'number')
  }
</script>

<template>
  <Card class="gap-2 py-4">
    <CardHeader class="px-4">
      <CardTitle class="text-sm font-medium text-muted-foreground">
        {{ $t(`features.stats.labels.${props.metric.group}.${props.metric.name}`) }}
      </CardTitle>
    </CardHeader>

    <CardContent class="px-4">
      <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <p class="text-2xl font-bold">
          {{ format(props.metric.today) }}
        </p>

        <p
          v-if="delta !== null"
          class="flex items-center gap-1 text-xs"
          :class="{
            'text-green-600 dark:text-green-400': delta > 0,
            'text-red-600 dark:text-red-400': delta < 0,
            'text-muted-foreground': delta === 0
          }"
        >
          <TrendingUpIcon
            v-if="delta > 0"
            class="size-3"
          />

          <TrendingDownIcon
            v-else-if="delta < 0"
            class="size-3"
          />

          <MinusIcon
            v-else
            class="size-3"
          />

          {{ $t('features.stats.delta', { change: `${delta > 0 ? '+' : ''}${format(delta)}` }) }}
        </p>
      </div>

      <div class="mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
        <div>
          <p>{{ $t('features.stats.periods.yesterday') }}</p>
          <p>{{ format(props.metric.yesterday) }}</p>
        </div>

        <div>
          <p>{{ $t('features.stats.periods.day_before') }}</p>
          <p>{{ format(props.metric.dayBefore) }}</p>
        </div>

        <div>
          <p>{{ $t('features.stats.periods.all') }}</p>
          <p>{{ format(props.metric.all) }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
  import { useI18n } from '@shared/plugins/i18n'
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/components/ui/card'
  import type { StatMetric } from '@/models/stat'

  const props = defineProps<{
    metric: StatMetric
  }>()

  const { n } = useI18n()

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

      <CardDescription>
        {{ $t('features.stats.periods.all') }} {{ format(props.metric.all) }}
      </CardDescription>
    </CardHeader>

    <CardContent class="px-4">
      <p class="text-2xl font-bold">
        {{ format(props.metric.today) }}
      </p>

      <div class="mt-1 flex gap-4 text-xs text-muted-foreground">
        <span>
          {{ $t('features.stats.periods.yesterday') }} {{ format(props.metric.yesterday) }}
        </span>

        <span>
          {{ $t('features.stats.periods.day_before') }} {{ format(props.metric.dayBefore) }}
        </span>
      </div>
    </CardContent>
  </Card>
</template>

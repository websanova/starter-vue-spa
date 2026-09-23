<script setup lang="ts">
  import { useStats } from '@/composables/api/stats'
  import { useDateTime } from '@shared/composables/support/useDateTime'
  import StatCard from '@/components/cards/Stat.vue'
  import { Load } from '@shared/components/common/Load'

  const { data, isPending, error } = useStats()

  const formatDate = useDateTime()
</script>

<template>
  <Load
    i18n-key="features.load.nouns.stats"
    :error="error"
    :is-pending="isPending"
  >
    <p
      v-if="data?.calculatedAt"
      class="mb-4 text-sm text-muted-foreground"
    >
      {{ $t('features.stats.updated', { date: formatDate(data.calculatedAt, 'long') }) }}
    </p>

    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        v-for="metric in data?.metrics"
        :key="`${metric.group}-${metric.name}`"
        :metric="metric"
      />
    </div>
  </Load>
</template>

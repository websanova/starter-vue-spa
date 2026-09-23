<script setup lang="ts">
  import { useStats } from '@/composables/api/stats'
  import { Heading } from '@shared/components/common/Heading'

  useStats()
</script>

<template>
  <div>
    <Heading>
      {{ $t('features.heading.title.stats') }}
    </Heading>
  </div>
</template>

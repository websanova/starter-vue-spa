<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import StatsList from '@/features/lists/Stats.vue'
</script>

<template>
  <div>
    <Heading>
      {{ $t('features.heading.title.stats') }}
    </Heading>

    <StatsList />
  </div>
</template>

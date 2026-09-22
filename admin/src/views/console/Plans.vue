<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import PlansList from '@/features/lists/Plans.vue'
</script>

<template>
  <div>
    <Heading :margin="false">
      {{ $t('features.heading.title.plans') }}
    </Heading>

    <PlansList />
  </div>
</template>

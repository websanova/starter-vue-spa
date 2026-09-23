<script setup lang="ts">
  import { LayersIcon } from '@lucide/vue'
  import { Item } from '@shared/components/common/Item'
  import type { Plan } from '@/models/plan'

  defineProps<{
    plan: Plan
  }>()
</script>

<template>
  <Item>
    <template #icon>
      <LayersIcon />
    </template>

    <template #title>
      {{ plan.name }}
    </template>
  </Item>
</template>

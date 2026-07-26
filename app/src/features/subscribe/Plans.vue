<script setup lang="ts">
  import { usePlans } from '@/composables/api/plans'

  const { data: plans, isPending, error } = usePlans()
</script>

<template>

</template>

<script setup lang="ts">
  import { type IndicatorVariants, indicatorVariants } from "."

  defineProps<{
    show?: boolean
    position?: IndicatorVariants["position"]
  }>()
</script>

<template>
  <span class="relative inline-flex shrink-0">
    <slot />

    <span
      v-if="show"
      :class="indicatorVariants({ position })"
    />
  </span>
</template>

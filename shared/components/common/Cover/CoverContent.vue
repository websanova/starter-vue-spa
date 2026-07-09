<script setup lang="ts">
  import { type CoverContentVariants, coverContentVariants } from "."

  defineProps<{
    size?: CoverContentVariants["size"]
  }>()
</script>

<template>
  <div :class="coverContentVariants({ size })">
    <slot />
  </div>
</template>

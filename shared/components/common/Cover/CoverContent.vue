<script setup lang="ts">
  import type { HTMLAttributes } from "vue"
  import { type CoverContentVariants, coverContentVariants } from "."
  import { cn } from "@shared/lib/utils"

  const props = defineProps<{
    size?: CoverContentVariants["size"]
    class?: HTMLAttributes["class"]
  }>()
</script>

<template>
  <div
    :class="cn(coverContentVariants({ size }), props.class)"
  >
    <slot />
  </div>
</template>

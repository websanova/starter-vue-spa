<script setup lang="ts">
  import type { HTMLAttributes } from "vue"
  import { cn } from "@shared/lib/utils"

  const props = defineProps<{
    class?: HTMLAttributes["class"]
  }>()
</script>

<template>
  <div :class="cn('fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-background', props.class)">
    <slot />
  </div>
</template>

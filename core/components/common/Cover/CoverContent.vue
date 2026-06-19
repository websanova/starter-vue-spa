<script setup lang="ts">
  import type { HTMLAttributes } from "vue"
  import { type CoverContentVariants, coverContentVariants } from "."
  import { cn } from "@core/lib/utils"

  interface Props {
    size?: CoverContentVariants["size"]
    class?: HTMLAttributes["class"]
  }

  const props = defineProps<Props>()
</script>

<template>
  <div :class="cn(coverContentVariants({ size }), props.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { type LayoutContainerVariants, layoutContainerVariants } from '.'
  import { cn } from '@shared/lib/utils'

  defineProps<{
    size?: LayoutContainerVariants['size']
  }>()
</script>

<template>
  <div class="flex-1 flex items-center justify-center">
    <div :class="cn(layoutContainerVariants({ size }), 'px-3')">
      <slot />
    </div>
  </div>
</template>

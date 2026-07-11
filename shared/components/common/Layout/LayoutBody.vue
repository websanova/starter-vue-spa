<script setup lang="ts">
  import { type LayoutContainerVariants, layoutContainerVariants } from '.'
  import { cn } from '@shared/lib/utils'

  defineProps<{
    size?: LayoutContainerVariants['size']
  }>()
</script>

<template>
  <div class="flex-1 flex px-3">
    <div :class="cn(layoutContainerVariants({ size }), 'flex')">
      <slot />
    </div>
  </div>
</template>

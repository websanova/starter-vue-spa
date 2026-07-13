<script setup lang="ts">
  import { type LayoutContainerVariants, layoutContainerVariants } from '.'
  import { cn } from '@shared/lib/utils'

  defineProps<{
    size?: LayoutContainerVariants['size']
  }>()
</script>

<template>
  <footer class="sticky bottom-0 z-[1000] w-full px-3 bg-background border-t shadow-sm h-[var(--app-footer-h,3rem)]">
    <div :class="cn(layoutContainerVariants({ size }), 'flex h-full items-center justify-between')">
      <slot />
    </div>
  </footer>
</template>

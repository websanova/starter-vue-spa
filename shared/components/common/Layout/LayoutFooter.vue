<script setup lang="ts">
  import { type LayoutContainerVariants, layoutContainerVariants } from '.'
  import { cn } from '@shared/lib/utils'

  defineProps<{
    size?: LayoutContainerVariants['size']
  }>()
</script>

<template>
  <footer class="sticky bottom-0 z-[1000] w-full bg-background shadow-sm h-[var(--app-footer-h,0px)]">
    <div :class="cn(layoutContainerVariants({ size }), 'px-2 flex h-full items-center justify-between')">
      <slot />
    </div>
  </footer>
</template>

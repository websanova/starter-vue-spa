<script setup lang="ts">
  import { type LayoutContainerVariants, layoutContainerVariants } from '.'
  import { cn } from '@shared/lib/utils'

  defineProps<{
    size?: LayoutContainerVariants['size']
  }>()
</script>

<template>
  <header class="sticky top-0 z-[1000] w-full bg-background border-b shadow-sm h-[var(--app-header-h,3rem)]">
    <div :class="cn(layoutContainerVariants({ size }), 'px-3 flex h-full items-center justify-between')">
      <slot name="logo" />
      <slot name="nav" />
    </div>
  </header>
</template>

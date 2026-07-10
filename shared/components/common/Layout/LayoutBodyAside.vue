<script setup lang="ts">
  withDefaults(defineProps<{
    side?: 'left' | 'right'
    width?: string
  }>(), {
    side: 'left',
    width: 'w-40',
  })
</script>

<template>
  <aside :class="[width, side === 'left' ? 'border-r' : 'border-l', 'shrink-0 sticky top-[var(--app-header-h,0px)] h-[calc(100dvh-var(--app-header-h,0px)-var(--app-footer-h,0px))] overflow-y-auto border-border']">
    <slot />
  </aside>
</template>

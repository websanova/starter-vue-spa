<script setup lang="ts">
  import { type LayoutContainerVariants, layoutContainerVariants } from '.'
  import { cn } from '@shared/lib/utils'

  withDefaults(defineProps<{
    size?: LayoutContainerVariants['size']
    leftWidth?: string
    rightWidth?: string
  }>(), {
    leftWidth: 'w-40',
    rightWidth: 'w-40',
  })
</script>

<template>
  <div class="flex-1 flex">
    <div :class="cn(layoutContainerVariants({ size }), 'flex')">
      <aside
        v-if="$slots.left"
        :class="[leftWidth, 'shrink-0 sticky top-[var(--app-header-h,0px)] h-[calc(100dvh-var(--app-header-h,0px)-var(--app-footer-h,0px))] overflow-y-auto border-r border-border']"
      >
        <slot name="left" />
      </aside>

      <main class="flex-1">
        <div class="px-3">
          <slot />
        </div>
      </main>

      <aside
        v-if="$slots.right"
        :class="[rightWidth, 'shrink-0 sticky top-[var(--app-header-h,0px)] h-[calc(100dvh-var(--app-header-h,0px)-var(--app-footer-h,0px))] overflow-y-auto border-l border-border']"
      >
        <slot name="right" />
      </aside>
    </div>
  </div>
</template>

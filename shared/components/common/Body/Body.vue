<script setup lang="ts">
  withDefaults(defineProps<{
    fluid?: boolean
    leftWidth?: string
    rightWidth?: string
  }>(), {
    fluid: false,
    leftWidth: 'w-40',
    rightWidth: 'w-40',
  })
</script>

<template>
  <div class="flex-1 flex min-h-0 overflow-hidden">
    <div :class="['mx-auto w-full flex flex-1 min-h-0', fluid ? '' : 'max-w-(--breakpoint-lg)']">
      <aside
        v-if="$slots.left"
        :class="[leftWidth, 'shrink-0 overflow-y-auto border-r border-border']"
      >
        <slot name="left" />
      </aside>

      <main class="flex-1 overflow-y-auto">
        <div class="px-2">
          <slot />
        </div>
      </main>

      <aside
        v-if="$slots.right"
        :class="[rightWidth, 'shrink-0 overflow-y-auto border-l border-border']"
      >
        <slot name="right" />
      </aside>
    </div>
  </div>
</template>

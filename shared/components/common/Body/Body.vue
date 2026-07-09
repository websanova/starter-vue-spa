<script setup lang="ts">
  withDefaults(defineProps<{
    fluid?: boolean
    leftWidth?: string
    rightWidth?: string
  }>(), {
    fluid: false,
    leftWidth: 'w-64',
    rightWidth: 'w-64',
  })
</script>

<template>
  <div class="flex-1 flex">
    <aside
      v-if="$slots.left"
      :class="[leftWidth, 'border-r border-border']"
    >
      <slot name="left" />
    </aside>

    <main class="flex-1">
      <div :class="['mx-auto px-2 w-full', fluid ? '' : 'max-w-(--breakpoint-xl)']">
        <slot />
      </div>
    </main>

    <aside
      v-if="$slots.right"
      :class="[rightWidth, 'border-l border-border']"
    >
      <slot name="right" />
    </aside>
  </div>
</template>

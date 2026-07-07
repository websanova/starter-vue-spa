<script setup lang="ts">
  withDefaults(defineProps<{
    fluid?: boolean
    height?: string
  }>(), {
    fluid: false,
    height: 'h-10',
  })
</script>

<template>
  <header
    :class="['sticky top-0 w-full bg-background shadow-sm', height]"
  >
    <div
      :class="['mx-auto px-4 w-full flex h-full items-center', fluid ? '' : 'max-w-(--breakpoint-xl)']"
    >
      <slot />
    </div>
  </header>
</template>

<script setup lang="ts">
  withDefaults(defineProps<{
    fluid?: boolean
  }>(), {
    fluid: false,
  })
</script>

<template>
  <header class="sticky top-0 z-[1000] w-full bg-background shadow-sm h-[var(--app-header-h,3.5rem)]">
    <div :class="['mx-auto px-2 w-full flex h-full items-center justify-between', fluid ? '' : 'max-w-(--breakpoint-lg)']">
      <slot name="logo" />
      <slot name="nav" />
    </div>
  </header>
</template>

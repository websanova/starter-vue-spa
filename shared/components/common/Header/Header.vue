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
      :class="['mx-auto px-4 w-full flex h-full items-center justify-between', fluid ? '' : 'max-w-(--breakpoint-xl)']"
    >
      <slot name="logo" />
      <slot name="nav" />
    </div>
  </header>
</template>

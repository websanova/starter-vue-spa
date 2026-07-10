<script setup lang="ts">
  withDefaults(defineProps<{
    fluid?: boolean
  }>(), {
    fluid: false,
  })
</script>

<template>
  <footer class="sticky bottom-0 z-[1000] w-full bg-background shadow-sm h-[var(--app-footer-h,0px)]">
    <div :class="['mx-auto px-2 w-full flex h-full items-center justify-between', fluid ? '' : 'max-w-(--breakpoint-lg)']">
      <slot />
    </div>
  </footer>
</template>

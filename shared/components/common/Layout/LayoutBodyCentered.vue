<script setup lang="ts">
  withDefaults(defineProps<{
    fluid?: boolean
  }>(), {
    fluid: false,
  })
</script>

<template>
  <div class="flex-1 flex items-center justify-center">
    <div :class="['mx-auto w-full px-3', fluid ? '' : 'max-w-(--breakpoint-lg)']">
      <slot />
    </div>
  </div>
</template>

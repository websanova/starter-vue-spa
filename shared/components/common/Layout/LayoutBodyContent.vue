<script setup lang="ts">
  withDefaults(defineProps<{
    centered?: boolean
  }>(), {
    centered: false,
  })
</script>

<template>
  <main
    class="flex-1"
    :class="centered ? 'flex items-center' : ''"
  >
    <div class="w-full px-3">
      <slot />
    </div>
  </main>
</template>

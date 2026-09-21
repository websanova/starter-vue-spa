<script setup lang="ts">
  withDefaults(defineProps<{
    margin?: boolean
  }>(), {
    margin: true,
  })
</script>

<template>
  <nav
    class="flex gap-4 border-b"
    :class="{ 'mb-3': margin }"
  >
    <slot />
  </nav>
</template>

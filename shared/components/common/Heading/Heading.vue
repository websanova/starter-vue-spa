<script setup lang="ts">
  const props = withDefaults(defineProps<{
    divider?: boolean
  }>(), {
    divider: true,
  })
</script>

<template>
  <h1
    class="text-2xl my-3 font-bold"
    :class="{ 'pb-2 border-b': divider }"
  >
    <slot />
  </h1>
</template>

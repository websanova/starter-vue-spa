<script setup lang="ts">
  const props = withDefaults(defineProps<{
    center?: boolean
    divider?: boolean
    margin?: boolean
  }>(), {
    center: false,
    divider: true,
    margin: true,
  })
</script>

<template>
  <h1
    class="text-2xl mt-3 font-bold"
    :class="{ 'mb-3': margin, 'pb-2 border-b': divider, 'text-center': center }"
  >
    <slot />
  </h1>
</template>

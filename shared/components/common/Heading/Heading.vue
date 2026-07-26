<script setup lang="ts">
  const props = withDefaults(defineProps<{
    center?: boolean
    divider?: boolean
  }>(), {
    center: false,
    divider: true,
  })
</script>

<template>
  <h1
    class="text-2xl my-3 font-bold"
    :class="{ 'pb-2 border-b': divider, 'text-center': center }"
  >
    <slot />
  </h1>
</template>

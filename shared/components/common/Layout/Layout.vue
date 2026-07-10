<script setup lang="ts">
  withDefaults(defineProps<{
    headerHeight?: string
    footerHeight?: string
  }>(), {
    headerHeight: '0px',
    footerHeight: '0px',
  })
</script>

<template>
  <div
    class="min-h-screen flex flex-col"
    :style="{ '--app-header-h': headerHeight, '--app-footer-h': footerHeight }"
  >
    <slot />
  </div>
</template>

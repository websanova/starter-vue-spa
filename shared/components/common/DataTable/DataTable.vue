<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>

<template>
  <div class="overflow-hidden rounded-md border">
    <p class="border-b bg-muted/50 px-4 py-2 font-semibold">
      {{ title }}
    </p>

    <dl class="divide-y text-sm">
      <slot />
    </dl>
  </div>
</template>

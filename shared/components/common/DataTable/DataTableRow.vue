<script setup lang="ts">
  defineProps<{
    label: string
  }>()
</script>

<template>
  <div class="grid gap-1 px-4 py-2 sm:grid-cols-3 sm:gap-4">
    <dt class="text-muted-foreground">
      {{ label }}
    </dt>

    <dd class="sm:col-span-2">
      <slot />
    </dd>
  </div>
</template>

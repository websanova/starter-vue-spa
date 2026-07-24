<script setup lang="ts">
  defineProps<{
    title: string
    body: string
  }>()

  defineEmits<{
    action: []
  }>()
</script>

<template>
  <div
    class="cursor-pointer rounded-md border p-3 transition-colors hover:bg-accent"
    @click="$emit('action')"
  >
    <p class="font-medium">
      {{ title }}
    </p>

    <p class="text-sm text-muted-foreground">
      {{ body }}
    </p>
  </div>
</template>

<script setup lang="ts">
  import { type NotificationVariants, notificationVariants } from "."

  defineProps<{
    title: string
    body: string
    variant?: NotificationVariants["variant"]
  }>()

  defineEmits<{
    action: []
  }>()
</script>

<template>
  <div
    :class="notificationVariants({ variant })"
    @click="$emit('action')"
  >
    <p class="text-sm font-bold">
      {{ title }}
    </p>

    <p class="text-xs">
      {{ body }}
    </p>
  </div>
</template>

<script setup lang="ts">
  import { XIcon } from "@lucide/vue"
  import { type NotificationVariants, notificationVariants } from "."

  defineProps<{
    title: string
    body: string
    variant?: NotificationVariants["variant"]
    dismissible?: boolean
  }>()

  defineEmits<{
    action: []
    dismiss: []
  }>()
</script>

<template>
  <div
    :class="notificationVariants({ variant })"
    @click="$emit('action')"
  >
    <div class="flex-1">
      <p class="text-sm font-bold">
        {{ title }}
      </p>

      <p class="text-xs">
        {{ body }}
      </p>
    </div>

    <button
      v-if="dismissible"
      type="button"
      class="shrink-0 cursor-pointer opacity-70 transition-opacity hover:opacity-100"
      @click.stop="$emit('dismiss')"
    >
      <XIcon class="size-4" />
      <span class="sr-only">{{ $t('features.sr.mark_read') }}</span>
    </button>
  </div>
</template>

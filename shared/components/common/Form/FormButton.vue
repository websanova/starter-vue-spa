<script setup lang="ts">
  import type { HTMLAttributes } from "vue"
  import { Button } from "@shared/components/ui/button"

  const props = defineProps<{
    pending?: boolean
    loadingText?: string
    class?: HTMLAttributes["class"]
  }>()
</script>

<template>
  <Button
    type="submit"
    :disabled="props.pending"
    :class="props.class"
  >
    <template v-if="props.pending && props.loadingText">
      {{ props.loadingText }}
    </template>

    <slot v-else />
  </Button>
</template>

<script setup lang="ts">
  import { Button } from "@shared/components/ui/button"
  import { Spinner } from "@shared/components/ui/spinner"

  const props = defineProps<{
    pending?: boolean
    disabled?: boolean
  }>()
</script>

<template>
  <Button
    :disabled="props.pending || props.disabled"
    class="relative"
  >
    <span
      v-if="props.pending"
      class="absolute inset-0 flex items-center justify-center"
    >
      <Spinner />
    </span>

    <span :class="{ invisible: props.pending }">
      <slot />
    </span>
  </Button>
</template>

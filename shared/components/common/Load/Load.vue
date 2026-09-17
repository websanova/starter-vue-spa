<script setup lang="ts">
  import { Loading } from "@shared/components/common/Loading"

  defineProps<{
    error: Error | null
    isPending: boolean
    model: string
  }>()
</script>

<template>
  <Loading v-if="isPending" />

  <p v-else-if="error">
    {{ $t('features.load.messages.error', { model: $t(`features.load.models.${model}`), error: error.message }) }}
  </p>

  <slot v-else />
</template>

<script setup lang="ts">
  import { Loading } from "@shared/components/common/Loading"

  defineProps<{
    error: Error | null
    i18nKey: string
    isPending: boolean
  }>()
</script>

<template>
  <Loading v-if="isPending" />

  <p v-else-if="error">
    {{ $t(`${i18nKey}.error`, [error.message]) }}
  </p>

  <slot v-else />
</template>

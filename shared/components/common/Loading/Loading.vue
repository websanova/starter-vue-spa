<script setup lang="ts">
  import { Spinner } from "@shared/components/ui/spinner"

  defineProps<{
    text?: string
  }>()
</script>

<template>
  <div class="flex items-center gap-2">
    <Spinner />
    <span>{{ text ?? $t('site.common.loading') }}</span>
  </div>
</template>

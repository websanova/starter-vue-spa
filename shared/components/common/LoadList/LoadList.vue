<script setup lang="ts">
  import { Load } from "@shared/components/common/Load"
  import type { ListMeta } from "@shared/models/list"

  defineProps<{
    center?: boolean
    error: Error | null
    i18nKey: string
    isPending: boolean
    meta?: ListMeta
  }>()
</script>

<template>
  <Load
    :center="center"
    :error="error"
    :is-pending="isPending"
    :i18n-key="i18nKey"
  >
    <slot v-if="meta?.total" />

    <p
      v-else
      class="my-3 text-muted-foreground"
      :class="{ 'text-center': center }"
    >
      {{ $t('features.load.messages.no_results', { noun: $t(i18nKey) }) }}
    </p>
  </Load>
</template>

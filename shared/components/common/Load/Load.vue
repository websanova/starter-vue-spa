<script setup lang="ts">
  import { Loading } from "@shared/components/common/Loading"

  defineProps<{
    center?: boolean
    error: Error | null
    i18nKey: string
    isPending: boolean
  }>()
</script>

<template>
  <div
    v-if="isPending"
    class="my-3"
    :class="{ 'flex justify-center': center }"
  >
    <Loading />
  </div>

  <p
    v-else-if="error"
    class="my-3"
    :class="{ 'text-center': center }"
  >
    {{ $t('features.load.messages.error', { noun: $t(i18nKey), error: error.message }) }}
  </p>

  <slot v-else />
</template>

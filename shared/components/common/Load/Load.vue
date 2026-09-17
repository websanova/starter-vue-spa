<script setup lang="ts">
  import { Loading } from "@shared/components/common/Loading"

  defineProps<{
    center?: boolean
    error: Error | null
    isPending: boolean
    model: string
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
    {{ $t('features.load.messages.error', { model: $t(`features.load.models.${model}`), error: error.message }) }}
  </p>

  <slot v-else />
</template>

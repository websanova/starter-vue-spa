<script setup lang="ts">
  import { Stack } from '@shared/components/common/Stack'

  defineProps<{
    heading: string
    open?: boolean
    summary?: string
  }>()

  const emit = defineEmits<{
    change: []
  }>()
</script>

<template>
  <Stack gap="sm">
    <p class="text-lg font-bold">
      {{ heading }}
    </p>

    <p
      v-if="!open"
      class="text-sm text-muted-foreground"
    >
      {{ summary }}

      <button
        type="button"
        class="cursor-pointer text-link"
        @click="emit('change')"
      >
        {{ $t('features.lbl.change') }}
      </button>
    </p>

    <!--
      Hidden rather than removed. A Stripe element is mounted into this
      slot, and taking it out of the document tears the mount down.
    -->
    <div v-show="open">
      <slot />
    </div>
  </Stack>
</template>

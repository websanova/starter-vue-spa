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

    <Transition name="fade-in">
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
    </Transition>

    <!--
      Hidden rather than removed. A Stripe element is mounted into this
      slot, and taking it out of the document tears the mount down.
    -->
    <Transition name="fade-in">
      <div v-show="open">
        <slot />
      </div>
    </Transition>
  </Stack>
</template>

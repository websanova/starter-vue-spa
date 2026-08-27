<script setup lang="ts">
  import { Stack } from '@shared/components/common/Stack'
  import BillingAddressForm from '@/features/forms/BillingAddress.vue'

  defineProps<{
    error?: string
    pending?: boolean
  }>()

  const emit = defineEmits<{
    complete: []
  }>()
</script>

<template>
  <Stack gap="sm">

    <p
      v-if="error"
      class="text-center text-destructive"
    >
      {{ error }}
    </p>

    <BillingAddressForm
      :submit-label="$t('features.lbl.continue')"
      :pending="pending"
      @success="emit('complete')"
    />

    <p class="text-center text-sm text-muted-foreground">
      * {{ $t('features.subscribe.checkout.note_address') }}
    </p>
  </Stack>
</template>

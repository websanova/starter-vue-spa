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
    <p class="text-sm text-muted-foreground">
      {{ $t('features.subscribe.checkout.note_address') }}
    </p>

    <p
      v-if="error"
      class="text-center text-destructive"
    >
      {{ error }}
    </p>

    <BillingAddressForm
      :pending="pending"
      @success="emit('complete')"
    >
      {{ $t('features.lbl.continue') }}
    </BillingAddressForm>
  </Stack>
</template>

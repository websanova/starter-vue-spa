<script setup lang="ts">
  import { useSyncPaymentMethod } from '@/composables/api/paymentMethod'
  import { useSubscription } from '@/composables/support/subscription'
  import { useMutationError } from '@shared/composables/primitives/useMutationError'
  import { Stack } from '@shared/components/common/Stack'
  import StripePaymentForm from '@shared/features/forms/StripePayment.vue'
  import type { StripeIntent } from '@shared/composables/primitives/useStripePayment'

  defineProps<{
    intent: StripeIntent | null
  }>()

  const emit = defineEmits<{
    complete: []
  }>()

  const sync = useSyncPaymentMethod()

  const { isTrialEligible } = useSubscription()

  const error = useMutationError(sync)

  const { isPending, mutate: syncPaymentMethod } = sync

  /**
   * A confirmed intent leaves the card attached and nothing more. The
   * sync call is what makes it the customer default, so a failure stops
   * here rather than moving on to a subscription with nothing to charge.
   * The intent stays confirmed, so submitting again retries the sync and
   * leaves the element alone.
   */
  function onComplete(id: string) {
    syncPaymentMethod({ setup_intent: id }, {
      onSuccess: () => emit('complete'),
    })
  }
</script>

<template>
  <Stack gap="sm">
    <StripePaymentForm
      :intent="intent"
      :error="error"
      :pending="isPending"
      @complete="onComplete"
    >
      {{ $t('features.lbl.continue') }}
    </StripePaymentForm>

    <p
      v-if="isTrialEligible"
      class="text-center text-sm text-muted-foreground"
    >
      * {{ $t('features.subscribe.checkout.note_payment_method') }}
    </p>
  </Stack>
</template>

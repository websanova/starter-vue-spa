<script setup lang="ts">
  import { usePaymentMethodForm } from '@/composables/support/paymentMethod'
  import { Loading } from '@shared/components/common/Loading'
  import StripePayment from '@shared/features/forms/StripePayment.vue'

  const { complete, error, intent, isLoading, isPending } = usePaymentMethodForm()
</script>

<template>
  <Loading
    v-if="isLoading"
    class="justify-center"
  />

  <!--
    Held back until the intent settles, since the element mounts against
    it on the form's first render. A user returning from a bank arrives
    with no intent and the form reads the secret off the url instead.
  -->
  <StripePayment
    v-else
    :error="error"
    :intent="intent"
    :pending="isPending"
    @complete="complete"
  >
    {{ $t('features.lbl.update') }}
  </StripePayment>
</template>

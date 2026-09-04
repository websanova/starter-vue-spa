<script setup lang="ts">
  import { ref } from 'vue'
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
  import BillingAddress from '@/features/billing/Address.vue'
  import BillingPaymentMethod from '@/features/billing/PaymentMethod.vue'
  import BillingSubscription from '@/features/billing/Subscription.vue'
  import PaymentMethodDeleteDialog from '@/features/dialogs/PaymentMethodDelete.vue'

  const isPaymentMethodDeleteOpen = ref<boolean>(false)

  // TODO: invoices (paginated) (last 10 or whatever).
</script>

<template>
  <Stack>
    <section>
      <Heading>
        {{ $t('features.heading.billing') }}
      </Heading>

      <Stack gap="sm">
        <BillingAddress />

        <BillingPaymentMethod @delete="isPaymentMethodDeleteOpen = true" />

        <BillingSubscription />
      </Stack>
    </section>

    <PaymentMethodDeleteDialog v-model:open="isPaymentMethodDeleteOpen" />
  </Stack>
</template>

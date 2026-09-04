<script setup lang="ts">
  import { ref } from 'vue'
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
  import PaymentMethodDeleteDialog from '@/features/dialogs/PaymentMethodDelete.vue'
  import BillingAddressDisplay from '@/features/displays/BillingAddress.vue'
  import BillingPaymentMethodDisplay from '@/features/displays/BillingPaymentMethod.vue'
  import BillingSubscriptionDisplay from '@/features/displays/BillingSubscription.vue'

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
        <BillingAddressDisplay />

        <BillingPaymentMethodDisplay @delete="isPaymentMethodDeleteOpen = true" />

        <BillingSubscriptionDisplay />
      </Stack>
    </section>

    <PaymentMethodDeleteDialog v-model:open="isPaymentMethodDeleteOpen" />
  </Stack>
</template>

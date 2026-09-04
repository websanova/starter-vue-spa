<script setup lang="ts">
  import { ref } from 'vue'
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
  import PaymentMethodDeleteDialog from '@/features/dialogs/PaymentMethodDelete.vue'
  import AddressText from '@/features/text/Address.vue'
  import PaymentMethodText from '@/features/text/PaymentMethod.vue'
  import SubscriptionText from '@/features/text/Subscription.vue'

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
        <AddressText />

        <PaymentMethodText @delete="isPaymentMethodDeleteOpen = true" />

        <SubscriptionText />
      </Stack>
    </section>

    <PaymentMethodDeleteDialog v-model:open="isPaymentMethodDeleteOpen" />
  </Stack>
</template>

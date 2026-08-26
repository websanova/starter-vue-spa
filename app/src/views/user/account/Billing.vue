<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
  import BillingAddress from '@/features/billing/Address.vue'
  import BillingPaymentMethod from '@/features/billing/PaymentMethod.vue'
  import BillingSubscription from '@/features/billing/Subscription.vue'

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

        <BillingPaymentMethod />

        <BillingSubscription />
      </Stack>
    </section>
  </Stack>
</template>

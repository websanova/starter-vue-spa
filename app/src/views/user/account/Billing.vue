<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
  import BillingPaymentMethod from '@/features/billing/PaymentMethod.vue'
  import BillingSubscription from '@/features/billing/Subscription.vue'

  // TODO: invoices (paginated) (last 10 or whatever).
</script>

<template>
  <Stack>
    <section>
      <Heading>
        {{ $t('features.headings.billing') }}
      </Heading>

      <Stack gap="sm">
        <BillingPaymentMethod />

        <BillingSubscription />
      </Stack>
    </section>
  </Stack>
</template>

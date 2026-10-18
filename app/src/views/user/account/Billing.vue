<script setup lang="ts">
  import { useDialogService } from '@shared/composables/services/useDialogService'
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
  import BillingPaymentMethodDisplay from '@/features/displays/BillingPaymentMethod.vue'
  import BillingSubscriptionDisplay from '@/features/displays/BillingSubscription.vue'
  import InvoicesList from '@/features/lists/Invoices.vue'

  const dialog = useDialogService()
</script>

<template>
  <Stack>
    <section>
      <Heading>
        {{ $t('features.heading.title.billing') }}
      </Heading>

      <Stack gap="sm">
        <BillingPaymentMethodDisplay @delete="dialog.open('paymentMethodDelete')" />

        <BillingSubscriptionDisplay />
      </Stack>
    </section>

    <section>
      <Heading :margin="false">
        {{ $t('features.heading.title.invoices') }}
      </Heading>

      <InvoicesList />
    </section>
  </Stack>
</template>

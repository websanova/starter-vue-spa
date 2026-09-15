<script setup lang="ts">
  import { useDialogService } from '@shared/composables/services/dialog'
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
  import BillingAddressDisplay from '@/features/displays/BillingAddress.vue'
  import BillingPaymentMethodDisplay from '@/features/displays/BillingPaymentMethod.vue'
  import BillingSubscriptionDisplay from '@/features/displays/BillingSubscription.vue'

  const dialog = useDialogService()

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

        <BillingPaymentMethodDisplay @delete="dialog.open('paymentMethodDelete')" />

        <BillingSubscriptionDisplay />
      </Stack>
    </section>
  </Stack>
</template>

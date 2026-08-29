<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
  import BillingAddressForm from '@/features/billing/AddressForm.vue'
</script>

<template>
  <Stack>
    <section>
      <Heading>
        {{ $t('features.heading.billing_address') }}
      </Heading>

      <BillingAddressForm />
    </section>
  </Stack>
</template>

<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
  import StripeBillingAddressForm from '@/features/forms/StripeBillingAddress.vue'
</script>

<template>
  <Stack>
    <section>
      <Heading>
        {{ $t('features.heading.billing_address') }}
      </Heading>

      <StripeBillingAddressForm />
    </section>
  </Stack>
</template>

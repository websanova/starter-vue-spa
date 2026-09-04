<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
  import StripeAddressForm from '@/features/forms/StripeAddress.vue'
</script>

<template>
  <Stack>
    <section>
      <Heading>
        {{ $t('features.heading.billing_address') }}
      </Heading>

      <StripeAddressForm />
    </section>
  </Stack>
</template>

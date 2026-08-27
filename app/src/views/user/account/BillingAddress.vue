<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
  import BillingAddressForm from '@/features/forms/BillingAddress.vue'
</script>

<template>
  <Stack>
    <section>
      <Heading>
        {{ $t('features.heading.billing_address') }}
      </Heading>

      <BillingAddressForm :submit-label="$t('features.lbl.update')" />
    </section>
  </Stack>
</template>

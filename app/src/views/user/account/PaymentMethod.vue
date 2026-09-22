<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
  import StripePaymentMethodForm from '@/features/forms/StripePaymentMethod.vue'
</script>

<template>
  <Stack>
    <section>
      <Heading>
        {{ $t('features.heading.title.payment_method') }}
      </Heading>

      <StripePaymentMethodForm />
    </section>
  </Stack>
</template>

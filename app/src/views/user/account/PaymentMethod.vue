<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
  import PaymentMethodForm from '@/features/billing/PaymentMethodForm.vue'
</script>

<template>
  <Stack>
    <section>
      <Heading>
        {{ $t('features.heading.payment_method') }}
      </Heading>

      <PaymentMethodForm />
    </section>
  </Stack>
</template>

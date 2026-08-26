<script setup lang="ts">
  import { CreditCardIcon } from '@lucide/vue'
  import { usePaymentMethod } from '@/composables/support/billing'
  import { Inline } from '@shared/components/common/Inline'

  const card = usePaymentMethod()
</script>

<template>
  <Inline>
    <CreditCardIcon class="size-5 shrink-0 text-muted-foreground" />

    <p v-if="card">
      {{ $t('features.billing.payment_method.card', card) }}

      <RouterLink
        :to="{ name: 'user-account-payment-method' }"
        class="text-link"
      >
        {{ $t('features.lbl.update') }}
      </RouterLink>
    </p>

    <p
      v-else
      class="text-muted-foreground"
    >
      {{ $t('features.billing.payment_method.card_none') }}
    </p>
  </Inline>
</template>

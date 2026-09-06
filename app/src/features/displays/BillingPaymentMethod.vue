<script setup lang="ts">
  import { CreditCardIcon } from '@lucide/vue'
  import { usePaymentMethod } from '@/composables/support/billing'
  import { Inline } from '@shared/components/common/Inline'

  defineEmits<{
    delete: []
  }>()

  const card = usePaymentMethod()
</script>

<template>
  <Inline>
    <CreditCardIcon class="size-5 shrink-0 text-muted-foreground" />

    <p v-if="card">
      {{ $t('features.display.billing_payment_method.card', card) }}

      <RouterLink
        :to="{ name: 'user-account-payment-method' }"
        class="text-link"
      >
        {{ $t('features.lbl.update') }}
      </RouterLink>

      <span class="mx-1 text-muted-foreground">|</span>

      <button
        type="button"
        class="text-destructive cursor-pointer"
        @click="$emit('delete')"
      >
        {{ $t('features.lbl.delete') }}
      </button>
    </p>

    <p
      v-else
      class="text-muted-foreground"
    >
      {{ $t('features.display.billing_payment_method.card_none') }}

      <RouterLink
        :to="{ name: 'user-account-payment-method' }"
        class="text-link"
      >
        {{ $t('features.lbl.add') }}
      </RouterLink>
    </p>
  </Inline>
</template>

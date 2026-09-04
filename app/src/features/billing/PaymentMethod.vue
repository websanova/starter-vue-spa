<script setup lang="ts">
  import { ref } from 'vue'
  import { CreditCardIcon } from '@lucide/vue'
  import { usePaymentMethod } from '@/composables/support/billing'
  import PaymentMethodDelete from '@/features/dialogs/PaymentMethodDelete.vue'
  import { Inline } from '@shared/components/common/Inline'

  const card = usePaymentMethod()

  const isDeleteOpen = ref<boolean>(false)
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

      <span class="mx-1 text-muted-foreground">|</span>

      <button
        type="button"
        class="text-destructive cursor-pointer"
        @click="isDeleteOpen = true"
      >
        {{ $t('features.lbl.delete') }}
      </button>
    </p>

    <p
      v-else
      class="text-muted-foreground"
    >
      {{ $t('features.billing.payment_method.card_none') }}
    </p>

    <PaymentMethodDelete
      v-if="card"
      v-model:open="isDeleteOpen"
    />
  </Inline>
</template>

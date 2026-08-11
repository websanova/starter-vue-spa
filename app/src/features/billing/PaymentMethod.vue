<script setup lang="ts">
  import { computed } from 'vue'
  import { CreditCardIcon } from '@lucide/vue'
  import { useAuthService } from '@shared/composables/services/auth'
  import { Inline } from '@shared/components/common/Inline'

  const { user } = useAuthService()

  const brand = computed(() => {
    const value = user.value?.paymentMethod?.brand ?? ''

    return value.charAt(0).toUpperCase() + value.slice(1)
  })
</script>

<template>
  <Inline>
    <CreditCardIcon class="size-5 shrink-0 text-muted-foreground" />

    <p v-if="user?.paymentMethod">
      {{ $t('features.billing.payment_method.card', { brand, last_four: user.paymentMethod.lastFour }) }}
    </p>

    <p
      v-else
      class="text-muted-foreground"
    >
      {{ $t('features.billing.payment_method.card_none') }}
    </p>

    <RouterLink
      :to="{ name: 'user-account-payment-method' }"
      class="text-link"
    >
      {{ $t('features.lbl.update') }}
    </RouterLink>
  </Inline>
</template>

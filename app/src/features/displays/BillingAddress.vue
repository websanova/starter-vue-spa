<script setup lang="ts">
  import { MapPinIcon } from '@lucide/vue'
  import { useBillingAddress } from '@/composables/support/billing'
  import { Inline } from '@shared/components/common/Inline'

  const address = useBillingAddress()
</script>

<template>
  <Inline>
    <MapPinIcon class="size-5 shrink-0 text-muted-foreground" />

    <p v-if="address">
      {{ address }}

      <RouterLink
        :to="{ name: 'user-account-billing-address' }"
        class="text-link"
      >
        {{ $t('features.lbl.update') }}
      </RouterLink>
    </p>

    <p
      v-else
      class="text-muted-foreground"
    >
      {{ $t('features.text.address.none') }}
    </p>
  </Inline>
</template>

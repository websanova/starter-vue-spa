<script setup lang="ts">
  import { ref } from 'vue'
  import { usePaymentMethodForm } from '@/composables/support/paymentMethod'
  import { Form, FormButton } from '@shared/components/common/Form'
  import { Loading } from '@shared/components/common/Loading'
  import StripeLogo from '@shared/components/logos/Stripe.vue'

  const target = ref<HTMLElement | null>(null)

  const { error, isLoading, isPending, submit } = usePaymentMethodForm({ target })
</script>

<template>
  <Loading
    v-if="isLoading"
    class="justify-center"
  />

  <!--
    Hidden rather than removed. The element is mounted into this target
    before the loading state drops, and taking it out of the document
    tears the mount down.
  -->
  <Form
    v-show="!isLoading"
    @submit="submit"
  >
    <p
      v-if="error"
      class="text-center text-destructive"
    >
      {{ error }}
    </p>

    <div ref="target" />

    <a
      class="flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
      href="https://stripe.com"
      rel="noopener"
      target="_blank"
    >
      {{ $t('features.form.stripe_payment_method.powered') }}
      <StripeLogo class="h-4" />
    </a>

    <FormButton :pending="isPending">
      {{ $t('features.lbl.update') }}
    </FormButton>
  </Form>
</template>

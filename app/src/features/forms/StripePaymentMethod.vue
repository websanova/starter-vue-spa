<script setup lang="ts">
  import { ref } from 'vue'
  import { usePaymentMethodForm } from '@/composables/support/usePaymentMethodForm'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Loading } from '@shared/components/common/Loading'
  import { Stack } from '@shared/components/common/Stack'
  import { WizardStep } from '@shared/components/common/WizardStep'
  import StripeLogo from '@shared/components/logos/Stripe.vue'

  const addressTarget = ref<HTMLElement | null>(null)
  const cardTarget = ref<HTMLElement | null>(null)

  const {
    addressSummary,
    error,
    goTo,
    isAddressComplete,
    isContinuing,
    isLoading,
    isPending,
    next,
    step,
    submit,
  } = usePaymentMethodForm({ addressTarget, cardTarget })
</script>

<template>
  <Loading
    v-if="isLoading"
    class="justify-center"
  />

  <!--
    Hidden rather than removed. Both elements are mounted into these
    targets before the step they belong to opens, and taking one out of
    the document tears the mount down.
  -->
  <Stack v-show="!isLoading">
    <p
      v-if="error"
      class="text-center text-destructive"
    >
      {{ error }}
    </p>

    <WizardStep
      :heading="$t('features.heading.title.billing_address')"
      :open="step === 'address'"
      :summary="addressSummary"
      @change="goTo('address')"
    >
      <div ref="addressTarget" />
    </WizardStep>

    <WizardStep
      v-show="step === 'payment'"
      :heading="$t('features.heading.title.payment_method')"
      open
    >
      <div ref="cardTarget" />
    </WizardStep>

    <a
      class="flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
      href="https://stripe.com"
      rel="noopener"
      target="_blank"
    >
      {{ $t('features.form.stripe_payment_method.powered') }}
      <StripeLogo class="h-4" />
    </a>

    <ButtonLoading
      v-if="step === 'address'"
      class="w-full"
      :disabled="!isAddressComplete"
      :pending="isContinuing"
      @click="next"
    >
      {{ $t('features.lbl.continue') }}
    </ButtonLoading>

    <ButtonLoading
      v-else
      class="w-full"
      :pending="isPending"
      @click="submit"
    >
      {{ $t('features.lbl.update') }}
    </ButtonLoading>
  </Stack>
</template>

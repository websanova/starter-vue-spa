<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute, useRouter } from 'vue-router'
  import { useCheckout } from '@/composables/support/useCheckout'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Loading } from '@shared/components/common/Loading'
  import { Stack } from '@shared/components/common/Stack'
  import { WizardStep } from '@shared/components/common/WizardStep'
  import type { Interval } from '@/models/plan'

  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()

  const plan = route.query.plan as string | undefined
  const interval = route.query.interval as Interval | undefined

  if (!plan || !interval) {
    router.replace({ name: 'user-subscribe-plans' })
  }

  const addressTarget = ref<HTMLElement | null>(null)
  const paymentTarget = ref<HTMLElement | null>(null)

  const {
    addressSummary,
    canConfirm,
    cardSummary,
    confirm,
    error,
    goTo,
    isAddressComplete,
    isConfirming,
    isContinuing,
    isLoading,
    isTaxPending,
    lineItems,
    next,
    part,
    step,
    total,
  } = useCheckout({
    addressTarget,
    interval,
    paymentTarget,
    plan,
  })

  /**
   * The plan and the price come off the session rather than the plans
   * list, since the session is what was actually opened and its total
   * already carries whatever tax and discount apply.
   */
  const summary = computed(() => ({
    interval: t(`site.units.interval.billed.${interval}`),
    plan: lineItems.value[0]?.name ?? '',
    price: total.value,
  }))
</script>

<template>
  <div class="flex justify-center">
    <Stack class="w-full sm:max-w-[25rem]">
      <div class="text-center">
        <p class="text-2xl font-bold">
          {{ $t('features.form.stripe_checkout.note_complete') }}
        </p>

        <p
          v-if="!isLoading"
          class="text-lg text-muted-foreground"
        >
          {{ $t('features.form.stripe_checkout.note_summary', summary) }}

          <span
            v-if="isTaxPending"
            class="text-xs"
          >
            {{ $t('features.form.stripe_checkout.note_tax') }}
          </span>
        </p>
      </div>

      <div
        v-if="isLoading"
        class="flex justify-center"
      >
        <Loading />
      </div>

      <template v-else>
        <p
          v-if="error"
          class="text-center text-destructive"
        >
          {{ error }}
        </p>

        <!--
          A card on file leaves nothing to collect, so no element is
          created and the step is a line of our own text.
        -->
        <p
          v-if="cardSummary"
          class="text-sm text-muted-foreground"
        >
          {{ cardSummary }}
        </p>

        <!--
          Both stay in the document once the confirm step is open. The
          elements are mounted into them and taking one out tears the
          mount down.
        -->
        <template v-else>
          <WizardStep
            v-show="step === 'payment-method'"
            :heading="$t('features.lbl.billing_address')"
            :open="part === 'address'"
            :summary="addressSummary"
            @change="goTo('address')"
          >
            <div ref="addressTarget" />
          </WizardStep>

          <Transition name="fade-in">
            <WizardStep
              v-show="step === 'payment-method' && part === 'card'"
              :heading="$t('features.lbl.payment_method')"
              open
            >
              <div ref="paymentTarget" />
            </WizardStep>
          </Transition>
        </template>

        <template v-if="step === 'payment-method' && part === 'address'">
          <ButtonLoading
            class="w-full"
            :disabled="!isAddressComplete"
            :pending="isContinuing"
            @click="next"
          >
            {{ $t('features.lbl.continue') }}
          </ButtonLoading>

          <p class="text-center text-sm text-muted-foreground">
            * {{ $t('features.form.stripe_checkout.note_address') }}
          </p>
        </template>

        <ButtonLoading
          v-else
          class="w-full"
          :disabled="!canConfirm"
          :pending="isConfirming"
          @click="confirm"
        >
          {{ $t('features.form.stripe_checkout.submit') }}
        </ButtonLoading>
      </template>
    </Stack>
  </div>
</template>

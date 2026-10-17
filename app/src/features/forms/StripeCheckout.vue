<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute, useRouter } from 'vue-router'
  import { useCheckout } from '@/composables/support/useCheckout'
  import { useSettingsStore } from '@shared/stores/settings'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Form } from '@shared/components/common/Form'
  import { Loading } from '@shared/components/common/Loading'
  import { WizardStep } from '@shared/components/common/WizardStep'
  import { Input } from '@shared/components/ui/input'
  import type { Interval } from '@/models/plan'

  const route = useRoute()
  const router = useRouter()
  const settings = useSettingsStore()
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
    applyPromotionCode,
    canConfirm,
    cardSummary,
    confirm,
    discount,
    error,
    goTo,
    isAddressComplete,
    isConfirming,
    isContinuing,
    isLoading,
    isPromotionCodePending,
    isTaxPending,
    lineItems,
    next,
    part,
    promotionCode,
    promotionError,
    removePromotionCode,
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

  /**
   * Sits with the payment method, so it waits behind the address the way
   * the subscribe button does and stands on the saved card step too.
   */
  const showPromotionCode = computed(() =>
    settings.data.subscriptionPromotionCodes &&
    !(step.value === 'payment-method' && part.value === 'address')
  )
</script>

<template>
  <Form>
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

      <div
        v-if="showPromotionCode"
        class="flex flex-col gap-2"
      >
        <div
          v-if="discount"
          class="flex items-center justify-between text-sm"
        >
          <span>
            {{ discount.displayName }}

            <button
              type="button"
              class="text-destructive cursor-pointer"
              :disabled="isPromotionCodePending"
              @click="removePromotionCode"
            >
              {{ $t('features.lbl.remove') }}
            </button>
          </span>

          <span>{{ discount.amount }}</span>
        </div>

        <div
          v-else
          class="flex gap-2"
        >
          <Input
            v-model="promotionCode"
            class="flex-1"
            type="text"
            :aria-invalid="!!promotionError"
            :placeholder="$t('features.ph.promotion_code')"
            @keydown.enter="applyPromotionCode"
          />

          <ButtonLoading
            variant="outline"
            :disabled="!promotionCode.trim()"
            :pending="isPromotionCodePending"
            @click="applyPromotionCode"
          >
            {{ $t('features.lbl.apply') }}
          </ButtonLoading>
        </div>

        <p
          v-if="promotionError"
          class="text-sm text-destructive"
        >
          {{ promotionError }}
        </p>
      </div>

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
  </Form>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute, useRouter } from 'vue-router'
  import { useCheckout } from '@/composables/support/checkout'
  import { useSettingsStore } from '@shared/stores/settings'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Loading } from '@shared/components/common/Loading'
  import { Stack } from '@shared/components/common/Stack'
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
  const promotionCode = ref<string>('')

  const {
    addressSummary,
    applyPromotionCode,
    cardSummary,
    changeCard,
    confirm,
    error,
    goTo,
    isAddressComplete,
    isApplying,
    isConfirming,
    isContinuing,
    isLoading,
    isTaxPending,
    isTrial,
    lineItems,
    next,
    promotionError,
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
    days: settings.data.subscriptionTrialDays,
    interval: t(`site.units.interval.billed.${interval}`),
    plan: lineItems.value[0]?.name ?? '',
    price: total.value,
  }))

  /**
   * A trial signup charges nothing today, so it needs the sentence that
   * dates the first payment rather than the one that claims it is being
   * taken now.
   */
  const summaryKey = computed(() => isTrial.value
    ? 'features.subscribe.checkout.note_summary_trial'
    : 'features.subscribe.checkout.note_summary'
  )
</script>

<template>
  <div class="flex justify-center">
    <Stack class="w-full sm:max-w-[25rem]">
      <div class="text-center">
        <p class="text-2xl font-bold">
          {{ $t('features.subscribe.checkout.note_complete') }}
        </p>

        <p
          v-if="!isLoading"
          class="text-lg text-muted-foreground"
        >
          {{ $t(summaryKey, summary) }}

          <span
            v-if="isTaxPending"
            class="text-xs"
          >
            {{ $t('features.subscribe.checkout.note_tax') }}
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

        <WizardStep
          :heading="$t('features.heading.billing_address')"
          :open="step === 'address'"
          :summary="addressSummary"
          @change="goTo('address')"
        >
          <div ref="addressTarget" />
        </WizardStep>

        <Transition name="fade-in">
          <WizardStep
            v-show="step === 'payment'"
            :heading="$t('features.heading.payment_method')"
            :open="!cardSummary"
            :summary="cardSummary"
            @change="changeCard"
          >
            <div ref="paymentTarget" />
          </WizardStep>
        </Transition>

        <template v-if="step === 'address'">
          <ButtonLoading
            class="w-full"
            :disabled="!isAddressComplete"
            :pending="isContinuing"
            @click="next"
          >
            {{ $t('features.lbl.continue') }}
          </ButtonLoading>

          <p class="text-center text-sm text-muted-foreground">
            * {{ $t('features.subscribe.checkout.note_address') }}
          </p>
        </template>

        <template v-else>
          <Stack gap="sm">
            <div class="flex gap-2">
              <Input
                v-model="promotionCode"
                :placeholder="$t('features.ph.promotion_code')"
              />

              <ButtonLoading
                variant="outline"
                :disabled="!promotionCode"
                :pending="isApplying"
                @click="applyPromotionCode(promotionCode)"
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
          </Stack>

          <ButtonLoading
            class="w-full"
            :pending="isConfirming"
            @click="confirm"
          >
            {{ $t('features.subscribe.checkout.submit') }}
          </ButtonLoading>

          <p
            v-if="isTrial"
            class="text-center text-sm text-muted-foreground"
          >
            * {{ $t('features.subscribe.checkout.note_payment_method') }}
          </p>
        </template>
      </template>
    </Stack>
  </div>
</template>

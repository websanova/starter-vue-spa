<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute, useRouter } from 'vue-router'
  import { usePlans } from '@/composables/api/plans'
  import { useBillingAddress, usePaymentMethod } from '@/composables/support/billing'
  import { useCheckout } from '@/composables/support/checkout'
  import { useSubscription } from '@/composables/support/subscription'
  import { useSettingsStore } from '@shared/stores/settings'
  import { Loading } from '@shared/components/common/Loading'
  import { Stack } from '@shared/components/common/Stack'
  import CheckoutAddress from './CheckoutAddress.vue'
  import CheckoutPaymentMethod from './CheckoutPaymentMethod.vue'
  import type { Interval } from '@/models/plan'

  // TODO: the confirm step. Promo code entry, the subscribe call, the
  // invoice challenge it can come back with, and the success action.

  const route = useRoute()
  const router = useRouter()
  const settings = useSettingsStore()
  const { n, t } = useI18n()

  const { data: plans } = usePlans()
  const { isTrialEligible } = useSubscription()
  const { error: intentError, goTo, intent, isOpening, next, step } = useCheckout()

  const address = useBillingAddress()
  const card = usePaymentMethod()

  const plan = route.query.plan as string | undefined
  const interval = route.query.interval as Interval | undefined

  if (!plan || !interval) {
    router.replace({ name: 'user-subscribe-plans' })
  }

  /**
   * The query only carries the slug, so the name and the price come from
   * the plans list. Nothing is rendered until both resolve, since the
   * list is fetched rather than passed in and a customer returning from
   * an authentication lands here without it warmed.
   */
  const summary = computed(() => {
    if (!plan || !interval) {
      return null
    }

    const selected = plans.value?.find((item) => item.slug === plan)
    const price = selected?.prices[interval]

    if (!selected || !price) {
      return null
    }

    return {
      days: settings.data.subscriptionTrialDays,
      interval: t(`site.units.interval.billed.${interval}`),
      plan: selected.name,
      price: n(price.amount / 100, { key: 'currency', currency: price.currency.toUpperCase() }),
    }
  })

  /**
   * A trial signup charges nothing today, so it needs the sentence that
   * dates the first payment rather than the one that claims it is being
   * taken now.
   */
  const summaryKey = computed(() => isTrialEligible.value
    ? 'features.subscribe.checkout.note_summary_trial'
    : 'features.subscribe.checkout.note_summary'
  )

  /**
   * A settled step collapses to a summary line with a way back into it.
   * The step being edited shows the form instead, so its own summary is
   * held back rather than sitting above a copy of itself.
   */
  const showAddress = computed(() => !!address.value && step.value !== 'address')

  const showCard = computed(() => !!card.value && step.value !== 'payment')
</script>

<template>
  <div class="flex justify-center">
    <Stack class="w-full sm:max-w-[25rem]">
      <div class="text-center">
        <p class="text-2xl font-bold">
          {{ $t('features.subscribe.checkout.note_complete') }}
        </p>

        <p
          v-if="summary"
          class="text-xl text-muted-foreground"
        >
          {{ $t(summaryKey, summary) }}
        </p>
      </div>

      <Stack
        v-if="showAddress || showCard"
        gap="sm"
      >
        <p
          v-if="showAddress"
          class="text-sm text-muted-foreground"
        >
          {{ address }}

          <button
            type="button"
            class="text-link"
            @click="goTo('address')"
          >
            {{ $t('features.lbl.change') }}
          </button>
        </p>

        <p
          v-if="showCard && card"
          class="text-sm text-muted-foreground"
        >
          {{ $t('features.billing.payment_method.card', card) }}

          <button
            type="button"
            class="text-link"
            @click="goTo('payment')"
          >
            {{ $t('features.lbl.change') }}
          </button>
        </p>
      </Stack>

      <div
        v-if="!step"
        class="flex justify-center"
      >
        <Loading />
      </div>

      <CheckoutAddress
        v-else-if="step === 'address'"
        :error="intentError"
        :pending="isOpening"
        @complete="next"
      />

      <CheckoutPaymentMethod
        v-else-if="step === 'payment'"
        :intent="intent"
        @complete="next"
      />
    </Stack>
  </div>
</template>

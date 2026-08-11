<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute, useRouter } from 'vue-router'
  import { usePlans } from '@/composables/api/plans'
  import { useCreateSubscriptionIntent } from '@/composables/api/subscription'
  import { useSubscription } from '@/composables/support/subscription'
  import { useMutationError } from '@shared/composables/primitives/useMutationError'
  import { useAuthService } from '@shared/composables/services/auth'
  import { useSettingsStore } from '@shared/stores/settings'
  import { Loading } from '@shared/components/common/Loading'
  import { Stack } from '@shared/components/common/Stack'
  import StripePaymentForm from '@shared/features/forms/StripePayment.vue'
  import type { Interval } from '@/models/plan'

  const pollAttempts = 8
  const pollInterval = 2000

  const auth = useAuthService()
  const route = useRoute()
  const router = useRouter()
  const settings = useSettingsStore()
  const { n, t } = useI18n()

  const { data: plans } = usePlans()
  const { isTrialEligible } = useSubscription()
  const subscriptionIntent = useCreateSubscriptionIntent()
  const error = useMutationError(subscriptionIntent)

  const isActivating = ref<boolean>(false)

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
   * A trial signup opens a setup intent and charges nothing today, so it
   * needs the sentence that dates the first payment rather than the one
   * that claims it is being taken now.
   */
  const summaryKey = computed(() => isTrialEligible.value
    ? 'features.subscribe.checkout.note_summary_trial'
    : 'features.subscribe.checkout.note_summary'
  )

  function createIntent() {
    return subscriptionIntent.mutateAsync({ plan: plan!, interval: interval! })
  }

  /**
   * Waits for the webhook to turn the payment into a subscription. Nothing
   * is synced from here, so the profile is refetched until the status
   * lands or the ceiling is reached. Running out of attempts is not a
   * failure, the activation simply has not arrived yet and the next load
   * of the app will pick it up.
   */
  async function onComplete() {
    isActivating.value = true

    for (let attempt = 0; attempt < pollAttempts; attempt += 1) {
      await auth.fetchUser()

      if (auth.user.value?.isSubscribed) {
        break
      }

      await new Promise((resolve) => setTimeout(resolve, pollInterval))
    }

    router.push({ name: 'user-landing' })
  }
</script>

<template>
  <div class="flex justify-center">
    <Loading
      v-if="isActivating"
      :text="$t('features.subscribe.checkout.activating')"
    />

    <p
      v-else-if="error"
      class="text-center"
    >
      {{ error }}
    </p>

    <Stack
      v-else
      class="w-full sm:max-w-[25rem]"
    >
      <div class="text-center">
        <p>
          {{ $t('features.subscribe.checkout.note_complete') }}
        </p>

        <p
          v-if="summary"
          class="text-sm text-muted-foreground"
        >
          {{ $t(summaryKey, summary) }}
        </p>
      </div>

      <StripePaymentForm
        :create="createIntent"
        @complete="onComplete"
      >
        {{ $t('features.subscribe.checkout.submit') }}
      </StripePaymentForm>
    </Stack>
  </div>
</template>

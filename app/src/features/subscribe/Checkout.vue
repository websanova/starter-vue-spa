<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute, useRouter } from 'vue-router'
  import { usePlans } from '@/composables/api/plans'
  import { useCreateSubscriptionIntent } from '@/composables/api/subscription'
  import { useSubscription } from '@/composables/support/subscription'
  import { useMutationError } from '@shared/composables/primitives/useMutationError'
  import { useStripePayment } from '@shared/composables/primitives/useStripePayment'
  import { useAuthService } from '@shared/composables/services/auth'
  import { useSettingsStore } from '@shared/stores/settings'
  import { Form, FormButton } from '@shared/components/common/Form'
  import { Loading } from '@shared/components/common/Loading'
  import { Stack } from '@shared/components/common/Stack'
  import StripeLogo from '@shared/components/logos/Stripe.vue'
  import type { Interval } from '@/models/plan'
  import type { StripeIntent } from '@shared/composables/primitives/useStripePayment'

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

  const isLoading = ref<boolean>(true)
  const isConfirming = ref<boolean>(false)
  const isActivating = ref<boolean>(false)
  const paymentError = ref<string>('')

  const plan = route.query.plan as string | undefined
  const interval = route.query.interval as Interval | undefined

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

  const payment = useStripePayment({
    selector: '#subscription-checkout',
    returnUrl: buildReturnUrl(),
  })

  start()

  /**
   * Sends the customer back to this page carrying the plan they picked,
   * so an authentication that had to leave the app returns somewhere
   * able to pick the intent back up.
   */
  function buildReturnUrl() {
    const { href } = router.resolve({
      name: 'user-subscribe-checkout',
      query: { plan, interval },
    })

    return new URL(href, window.location.origin).toString()
  }

  /**
   * Picks up an intent the customer was redirected away to authenticate.
   * Which key Stripe appended also names the intent type, so the secret
   * and the type are only ever read as a pair.
   */
  function returnedIntent(): StripeIntent | null {
    const paymentSecret = route.query.payment_intent_client_secret as string | undefined

    if (paymentSecret) {
      return { clientSecret: paymentSecret, type: 'payment' }
    }

    const setupSecret = route.query.setup_intent_client_secret as string | undefined

    if (setupSecret) {
      return { clientSecret: setupSecret, type: 'setup' }
    }

    return null
  }

  async function start() {
    const intent = returnedIntent()

    if (intent) {
      await resume(intent)
      return
    }

    if (!plan || !interval) {
      router.replace({ name: 'user-subscribe-plans' })
      return
    }

    subscriptionIntent.mutate({ plan, interval }, {
      onSuccess: (data) => {
        isLoading.value = false
        payment.mount(data)
      },
      onError: () => {
        isLoading.value = false
      },
    })
  }

  /**
   * Reads how the authentication the customer was sent away for ended.
   * A refusal leaves the intent confirmable, so the element goes back up
   * against the same secret and they can try again without opening a
   * second one.
   */
  async function resume(intent: StripeIntent) {
    const { status, message } = await payment.retrieve(intent)

    if (status === 'succeeded' || status === 'processing') {
      isLoading.value = false
      onComplete()
      return
    }

    paymentError.value = message || t('features.subscribe.checkout.failed')
    isLoading.value = false

    await payment.mount(intent)
  }

  async function onSubmit() {
    isConfirming.value = true
    paymentError.value = ''

    const message = await payment.confirm()

    if (message) {
      isConfirming.value = false
      return
    }

    onComplete()
  }

  /**
   * Waits for the webhook to turn the payment into a subscription. Nothing
   * is synced from here, so the profile is refetched until the status
   * lands or the ceiling is reached. Running out of attempts is not a
   * failure, the activation simply has not arrived yet and the next load
   * of the app will pick it up.
   */
  async function onComplete() {
    payment.destroy()
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
      v-if="isLoading"
      :text="$t('features.subscribe.checkout.loading')"
    />

    <Loading
      v-else-if="isActivating"
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

      <Form @submit="onSubmit">
        <p
          v-if="paymentError"
          class="text-center text-destructive"
        >
          {{ paymentError }}
        </p>

        <div id="subscription-checkout" class="rounded-lg shadow-sm"/>

        <a
          class="flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
          href="https://stripe.com"
          rel="noopener"
          target="_blank"
        >
          {{ $t('features.subscribe.checkout.powered') }}
          <StripeLogo class="h-4" />
        </a>

        <FormButton
          class="w-full"
          :pending="isConfirming"
        >
          {{ $t('features.subscribe.checkout.submit') }}
        </FormButton>
      </Form>
    </Stack>
  </div>
</template>

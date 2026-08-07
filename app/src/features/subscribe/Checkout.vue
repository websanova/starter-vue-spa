<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute, useRouter } from 'vue-router'
  import { useCreateSubscriptionIntent } from '@/composables/api/subscription'
  import { useMutationError } from '@shared/composables/primitives/useMutationError'
  import { useStripePayment } from '@shared/composables/primitives/useStripePayment'
  import { useAuthService } from '@shared/composables/services/auth'
  import { Form, FormButton } from '@shared/components/common/Form'
  import { Loading } from '@shared/components/common/Loading'
  import StripeLogo from '@shared/components/logos/Stripe.vue'
  import type { Interval } from '@/models/plan'
  import type { StripeIntent } from '@shared/composables/primitives/useStripePayment'

  const pollAttempts = 8
  const pollInterval = 2000

  const auth = useAuthService()
  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()

  const subscriptionIntent = useCreateSubscriptionIntent()
  const error = useMutationError(subscriptionIntent)

  const isLoading = ref<boolean>(true)
  const isConfirming = ref<boolean>(false)
  const isActivating = ref<boolean>(false)
  const paymentError = ref<string>('')

  const plan = route.query.plan as string | undefined
  const interval = route.query.interval as Interval | undefined

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

    <Form
      v-else
      @submit="onSubmit"
    >
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
  </div>
</template>

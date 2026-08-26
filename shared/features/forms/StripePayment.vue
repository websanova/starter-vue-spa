<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute, useRouter } from 'vue-router'
  import { useStripePayment } from '@shared/composables/primitives/useStripePayment'
  import { Form, FormButton } from '@shared/components/common/Form'
  import { Loading } from '@shared/components/common/Loading'
  import StripeLogo from '@shared/components/logos/Stripe.vue'
  import type { StripeIntent } from '@shared/composables/primitives/useStripePayment'

  /**
   * Stripe appends these to the return url once the customer comes back
   * from an authentication. They are dropped when the url is rebuilt, so
   * a second attempt does not carry the secret of the first one back and
   * resume an intent that is already spent.
   */
  const returnKeys = [
    'payment_intent',
    'payment_intent_client_secret',
    'redirect_status',
    'setup_intent',
    'setup_intent_client_secret',
  ]

  const props = defineProps<{
    intent: StripeIntent | null
    error?: string
    pending?: boolean
  }>()

  const emit = defineEmits<{
    complete: [id: string]
  }>()

  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()

  const element = ref<HTMLElement | null>(null)
  const isLoading = ref<boolean>(true)
  const isConfirming = ref<boolean>(false)
  const paymentError = ref<string>('')
  const confirmedId = ref<string>('')

  const payment = useStripePayment({
    target: element,
    returnUrl: buildReturnUrl(),
  })

  start()

  /**
   * Sends the customer back to the page they started on with the query
   * it was opened with, so an authentication that had to leave the app
   * returns somewhere able to pick the intent back up.
   */
  function buildReturnUrl() {
    const query = { ...route.query }

    returnKeys.forEach((key) => delete query[key])

    const { href } = router.resolve({ name: route.name, params: route.params, query })

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

  /**
   * The intent is opened by the caller and handed over ready, since what
   * it takes to open one, and what to do when that fails, belongs to
   * whatever screen this is sitting on. Nothing mounts without a secret,
   * so a missing one only drops out of the loading state.
   */
  async function start() {
    const returned = returnedIntent()

    if (returned) {
      await resume(returned)
      return
    }

    isLoading.value = false

    if (props.intent) {
      await payment.mount(props.intent)
    }
  }

  /**
   * Processing is treated as done alongside succeeded, since a payment
   * still clearing is out of the customer hands and nothing more is
   * asked of them here.
   */
  function isSettled(status: string) {
    return status === 'succeeded' || status === 'processing'
  }

  /**
   * Reads how the authentication the customer was sent away for ended.
   * A refusal leaves the intent confirmable, so the element goes back up
   * against the same secret and they can try again without opening a
   * second one.
   */
  async function resume(intent: StripeIntent) {
    const { id, status, message } = await payment.retrieve(intent)

    if (isSettled(status)) {
      isLoading.value = false
      onComplete(id)
      return
    }

    paymentError.value = message || t('features.form.stripe_payment.failed')
    isLoading.value = false

    await payment.mount(intent)
  }

  /**
   * A confirmed intent is spent, so submitting again reports the same
   * one rather than confirming a second time. That is what lets the
   * parent retry whatever it does with the result, such as a sync call
   * that errored, without asking for the card details again.
   */
  async function onSubmit() {
    if (confirmedId.value) {
      emit('complete', confirmedId.value)
      return
    }

    isConfirming.value = true
    paymentError.value = ''

    const { id, status, message } = await payment.confirm()

    if (isSettled(status)) {
      onComplete(id)
      return
    }

    paymentError.value = message
    isConfirming.value = false
  }

  /**
   * The element is left standing and the id is kept, since the parent
   * may still fail at whatever it does next and submit again. Tearing
   * the element down happens on unmount, once the parent has moved on.
   */
  function onComplete(id: string) {
    confirmedId.value = id
    isConfirming.value = false
    emit('complete', id)
  }
</script>

<template>
  <Loading
    v-if="isLoading"
    class="justify-center"
  />

  <Form
    v-else
    @submit="onSubmit"
  >
    <p
      v-if="paymentError || error"
      class="text-center text-destructive"
    >
      {{ paymentError || error }}
    </p>

    <div
      ref="element"
    />

    <a
      class="flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
      href="https://stripe.com"
      rel="noopener"
      target="_blank"
    >
      {{ $t('features.form.stripe_payment.powered') }}
      <StripeLogo class="h-4" />
    </a>

    <FormButton
      class="w-full"
      :pending="isConfirming || pending"
    >
      <slot />
    </FormButton>
  </Form>
</template>

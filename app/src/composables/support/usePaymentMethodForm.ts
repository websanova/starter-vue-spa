import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCreatePaymentMethodIntent, useSyncPaymentMethod, useUpdateBillingAddress } from '@/composables/api/paymentMethod'
import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useStripeAddress } from '@shared/composables/primitives/useStripeAddress'
import { useStripePayment } from '@shared/composables/primitives/useStripePayment'
import { useI18n } from '@shared/plugins/i18n'
import type { StripeIntent } from '@shared/composables/primitives/useStripePayment'
import type { Ref } from 'vue'

interface PaymentMethodOptions {
  addressTarget: Ref<HTMLElement | null>
  cardTarget: Ref<HTMLElement | null>
}

export type PaymentMethodStep =
  | 'address'
  | 'payment'

/**
 * Stripe appends these to the return url once the user comes back from
 * an authentication. They are dropped when the url is rebuilt, so a
 * second attempt does not carry the secret of the first one back and
 * resume an intent that is already spent.
 */
const returnKeys = [
  'redirect_status',
  'setup_intent',
  'setup_intent_client_secret',
]

/**
 * Drives the payment method page, the address first and the card after.
 * The address element needs no secret, so the page opens on a step that
 * costs no call at all, and the intent is only opened once the address
 * is saved to the customer. Nothing is charged, the card entered here is
 * what the next renewal bills.
 */
export function usePaymentMethodForm({ addressTarget, cardTarget }: PaymentMethodOptions) {
  const i18n = useI18n()
  const route = useRoute()
  const router = useRouter()

  const updateAddress = useUpdateBillingAddress()
  const create = useCreatePaymentMethodIntent()
  const sync = useSyncPaymentMethod()

  const address = useStripeAddress({ target: addressTarget })
  const payment = useStripePayment({ target: cardTarget, returnUrl: buildReturnUrl() })

  const isLoading = ref<boolean>(true)
  const isContinuing = ref<boolean>(false)
  const isPending = ref<boolean>(false)
  const isFailed = ref<boolean>(false)
  const stripeError = ref<string>('')

  const step = ref<PaymentMethodStep>('address')

  /**
   * What the collapsed address step shows, built from the value that
   * was sent rather than read back, since nothing about the address is
   * stored on our side and the customer at Stripe holds the only copy.
   */
  const addressSummary = ref<string>('')

  /**
   * The intent carries no address, so a second trip through the address
   * step reuses the one already held rather than opening another.
   */
  let secret = ''

  /**
   * A confirmed intent is spent, so a submit after one lands retries
   * whatever failed after it rather than confirming a second time.
   */
  let confirmedId = ''

  const mutationError = useMutationError(updateAddress, create, sync)

  /**
   * Anything that is not an HTTP error carries no message of its own, a
   * dead stripe.js among them. Those still get a sentence rather than a
   * page with nothing on it where the form should be.
   */
  const error = computed(() => {
    const message = stripeError.value || mutationError.value

    if (message) {
      return message
    }

    return isFailed.value ? i18n.t('features.form.stripe_payment_method.failed') : ''
  })

  start()

  /**
   * Sends the user back to the page they started on with the query it
   * was opened with, so an authentication that had to leave the app
   * returns somewhere able to pick the intent back up.
   */
  function buildReturnUrl() {
    const query = { ...route.query }

    returnKeys.forEach((key) => delete query[key])

    const { href } = router.resolve({ name: route.name, params: route.params, query })

    return new URL(href, window.location.origin).toString()
  }

  /**
   * A secret on the url is a user coming back from a bank. Only the
   * setup key is looked for, since this page never opens a payment
   * intent.
   */
  function returnedIntent(): StripeIntent | null {
    const secret = route.query.setup_intent_client_secret as string | undefined

    return secret ? { clientSecret: secret, type: 'setup' } : null
  }

  /**
   * A user returning from an authentication picks up the intent they
   * left on rather than opening a second one, which would spend a
   * create on an intent nothing mounts and bury a confirm they already
   * completed behind its error.
   *
   * Every other visit opens the address step, which the element mounts
   * into with no secret and nothing prefilled.
   *
   * The elements mount while the loading state is still up, so their
   * targets have to be in the document from the first render rather
   * than behind the loader.
   */
  async function start() {
    const returned = returnedIntent()

    try {
      if (returned) {
        await resume(returned)
        return
      }

      const mounted = await address.mount()

      isFailed.value = !mounted
    } catch (err) {
      console.error(err)
      isFailed.value = true
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Reads how the authentication the user was sent away for ended. A
   * refusal leaves the intent confirmable, so the page comes back up on
   * the payment step against the same secret and they try again without
   * opening a second one. The address is already on the customer by
   * this point, so there is nothing there left to collect.
   */
  async function resume(intent: StripeIntent) {
    const { id, status, message } = await payment.retrieve(intent)

    if (status === 'succeeded') {
      await settle(id)
      return
    }

    isFailed.value = true
    stripeError.value = message

    secret = intent.clientSecret
    step.value = 'payment'

    await address.mount()
    await payment.mount(intent)
  }

  /**
   * Saves the address before any intent exists, since a bank challenge
   * that never comes back would otherwise leave the card stored and the
   * address the user came to change sitting in a dead browser. Stripe
   * rejecting it lands on the step that owns the fields.
   */
  async function next() {
    const value = await address.getValue()

    if (!value) {
      return
    }

    isContinuing.value = true
    isFailed.value = false
    stripeError.value = ''

    try {
      await updateAddress.mutateAsync({
        city: value.address.city,
        country: value.address.country,
        line1: value.address.line1,
        line2: value.address.line2 || undefined,
        name: value.name ?? '',
        postal_code: value.address.postal_code,
        state: value.address.state || undefined,
      })

      addressSummary.value = [
        value.address.line1,
        value.address.line2,
        value.address.city,
        value.address.state,
        value.address.postal_code,
        value.address.country,
      ].filter(Boolean).join(', ')

      if (!secret) {
        const intent = await create.mutateAsync()

        secret = intent.clientSecret

        await payment.mount({ clientSecret: secret, type: 'setup' })
      }

      step.value = 'payment'
    } catch (err) {
      console.error(err)
      isFailed.value = true
    } finally {
      isContinuing.value = false
    }
  }

  /**
   * Going back leaves both elements standing, so the address comes back
   * with everything typed into it and the intent is untouched.
   */
  function goTo(value: PaymentMethodStep) {
    step.value = value
  }

  /**
   * Confirming attaches the card and nothing else, so the sync call is
   * what makes it the payment method on file. A refusal leaves the
   * intent confirmable and the element standing, so the user corrects
   * the card and submits again on the same secret.
   */
  async function submit() {
    if (confirmedId) {
      await settle(confirmedId)
      return
    }

    isPending.value = true
    isFailed.value = false
    stripeError.value = ''

    const { id, status, message } = await payment.confirm()

    if (status !== 'succeeded') {
      stripeError.value = message
      isPending.value = false
      return
    }

    await settle(id)
  }

  /**
   * The customer defaults and the local row are all that is left behind
   * Stripe at this point. A failure holds the user here with the
   * message, and the confirmed intent is kept so submitting again
   * retries the sync rather than asking for the card a second time. The
   * webhook runs the same writes regardless.
   */
  async function settle(id: string) {
    confirmedId = id
    isPending.value = true

    try {
      await sync.mutateAsync({ setup_intent: id })

      router.replace({ name: 'user-account-billing' })
    } catch (err) {
      console.error(err)
      isFailed.value = true
    } finally {
      isPending.value = false
    }
  }

  return {
    addressSummary,
    error,
    goTo,
    isAddressComplete: address.isComplete,
    isContinuing,
    isLoading,
    isPending,
    next,
    step,
    submit,
  }
}

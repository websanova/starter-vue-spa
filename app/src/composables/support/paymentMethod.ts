import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCreatePaymentMethodIntent, useSyncPaymentMethod } from '@/composables/api/paymentMethod'
import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useStripePayment } from '@shared/composables/primitives/useStripePayment'
import { useI18n } from '@shared/plugins/i18n'
import type { StripeIntent } from '@shared/composables/primitives/useStripePayment'
import type { Ref } from 'vue'

interface PaymentMethodOptions {
  target: Ref<HTMLElement | null>
}

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
 * Drives the payment method page. The intent is opened on load rather
 * than behind a button, since a page dedicated to this one job is the
 * user declaring intent already and the element cannot mount without a
 * secret. Nothing is charged, the card entered here is what the next
 * renewal bills.
 */
export function usePaymentMethodForm({ target }: PaymentMethodOptions) {
  const i18n = useI18n()
  const route = useRoute()
  const router = useRouter()

  const create = useCreatePaymentMethodIntent()
  const sync = useSyncPaymentMethod()

  const payment = useStripePayment({ target, returnUrl: buildReturnUrl() })

  const isLoading = ref<boolean>(true)
  const isPending = ref<boolean>(false)
  const isFailed = ref<boolean>(false)
  const stripeError = ref<string>('')

  /**
   * A confirmed intent is spent, so a submit after one lands retries
   * whatever failed after it rather than confirming a second time.
   */
  let confirmedId = ''

  const mutationError = useMutationError(create, sync)

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

    return isFailed.value ? i18n.t('features.billing.payment_method.failed') : ''
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
   * The element mounts while the loading state is still up, so its
   * target has to be in the document from the first render rather than
   * behind the loader.
   */
  async function start() {
    const returned = returnedIntent()

    if (returned) {
      await resume(returned)
      return
    }

    try {
      const { clientSecret } = await create.mutateAsync()

      await payment.mount({ clientSecret, type: 'setup' })
    } catch (err) {
      console.error(err)
      isFailed.value = true
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Reads how the authentication the user was sent away for ended. A
   * refusal leaves the intent confirmable, so the element goes back up
   * against the same secret and they try again without opening a second
   * one.
   */
  async function resume(intent: StripeIntent) {
    const { id, status, message } = await payment.retrieve(intent)

    isLoading.value = false

    if (status === 'succeeded') {
      await settle(id)
      return
    }

    isFailed.value = true
    stripeError.value = message

    await payment.mount(intent)
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
    error,
    isLoading,
    isPending,
    submit,
  }
}

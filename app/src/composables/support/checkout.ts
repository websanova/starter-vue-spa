import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCreateSubscriptionSession, useSyncSubscription } from '@/composables/api/subscription'
import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useStripeCheckout } from '@shared/composables/primitives/useStripeCheckout'
import { useAuthService } from '@shared/composables/services/auth'
import { useI18n } from '@shared/plugins/i18n'
import type { Interval } from '@/models/plan'
import type { StripeCheckoutContact } from '@stripe/stripe-js'
import type { Ref } from 'vue'

interface CheckoutOptions {
  addressTarget: Ref<HTMLElement | null>
  interval: Interval | undefined
  paymentTarget: Ref<HTMLElement | null>
  plan: string | undefined
}

/**
 * Survives the trip to a bank and back. Stripe returns the customer to
 * a freshly loaded page, and the session is confirmed again rather than
 * replaced, so the secret has to outlive the reload.
 */
const storageKey = 'subscribe.session'

/**
 * Drives the subscribe page. One checkout session carries the address,
 * the card, the promotion code and the totals, so there are no steps to
 * sequence and nothing exists at Stripe until the customer confirms.
 */
export function useCheckout({ addressTarget, interval, paymentTarget, plan }: CheckoutOptions) {
  const auth = useAuthService()
  const i18n = useI18n()
  const router = useRouter()

  const createSubscriptionSession = useCreateSubscriptionSession()
  const syncSubscription = useSyncSubscription()

  const checkout = useStripeCheckout({ addressTarget, paymentTarget })

  const isLoading = ref<boolean>(true)
  const isConfirming = ref<boolean>(false)
  const isApplying = ref<boolean>(false)
  const isFailed = ref<boolean>(false)
  const stripeError = ref<string>('')

  const mutationError = useMutationError(createSubscriptionSession, syncSubscription)

  /**
   * Anything that is not an HTTP error carries no message of its own, a
   * dead stripe.js and a malformed response among them. Those still get
   * a sentence rather than an empty page where the form should be.
   */
  const error = computed(() => {
    const message = stripeError.value || mutationError.value

    if (message) {
      return message
    }

    return isFailed.value ? i18n.t('features.form.stripe_payment.failed') : ''
  })

  /**
   * The session is the only thing that knows what this costs. Tax comes
   * off the address and the discount off the promotion code, both
   * calculated by Stripe, so nothing is priced or estimated here.
   */
  const total = computed(() => checkout.session.value?.total.total.amount ?? '')

  const lineItems = computed(() => checkout.session.value?.lineItems ?? [])

  start()

  /**
   * The address on file is a prefill and nothing more. It is not written
   * to the customer and the element is free to be edited over it, since
   * the address that counts is whatever is in the element at confirm.
   */
  function defaultBillingAddress(): StripeCheckoutContact | null {
    const value = auth.user.value?.billingAddress

    if (!value) {
      return null
    }

    return {
      address: {
        city: value.city,
        country: value.country,
        line1: value.line1,
        line2: value.line2,
        postal_code: value.postalCode,
        state: value.state,
      },
    }
  }

  /**
   * A secret in storage means the customer is coming back from a bank
   * challenge. That session is re-initialised rather than replaced,
   * since it may already have completed while they were away and a new
   * one would subscribe them twice.
   */
  async function start() {
    const stored = sessionStorage.getItem(storageKey)

    if (stored) {
      await open(stored)
      return
    }

    // Not reachable. The page redirects itself off a query missing
    // either half of the plan it is supposed to be selling.
    if (!plan || !interval) {
      return
    }

    try {
      const { clientSecret } = await createSubscriptionSession.mutateAsync({ interval, plan })

      sessionStorage.setItem(storageKey, clientSecret)

      await open(clientSecret)
    } catch {
      isFailed.value = true
      isLoading.value = false
    }
  }

  /**
   * Without a session there is nothing to mount, so the failure is shown
   * rather than an empty page where the form should be. The elements go
   * up after the loading state drops, since that is the render their
   * targets first exist in.
   */
  async function open(clientSecret: string) {
    const { message, session } = await checkout.load(clientSecret, defaultBillingAddress())

    isLoading.value = false

    if (!session) {
      isFailed.value = true
      stripeError.value = message
      return
    }

    if (session.status.type === 'complete') {
      await sync()
      return
    }

    await checkout.mount()
  }

  async function applyPromotionCode(code: string) {
    isApplying.value = true
    isFailed.value = false
    stripeError.value = ''

    const { message } = await checkout.applyPromotionCode(code)

    stripeError.value = message
    isApplying.value = false
  }

  /**
   * One call submits the address and the card, creates the subscription
   * and settles the first invoice. A refusal creates nothing, so the
   * elements stay up and the customer confirms again on the same
   * session rather than starting over on a new one.
   */
  async function confirm() {
    isConfirming.value = true
    isFailed.value = false
    stripeError.value = ''

    const { message, session } = await checkout.confirm()

    if (!session || session.status.type !== 'complete') {
      stripeError.value = message
      isConfirming.value = false
      return
    }

    await sync()
  }

  /**
   * The local rows are the only thing left behind Stripe at this point.
   * A failure here leaves the subscription live and correct, so the
   * customer is held on the page with the error and can submit again,
   * and the webhook lands regardless.
   */
  async function sync() {
    const session = checkout.session.value

    if (!session) {
      return
    }

    try {
      await syncSubscription.mutateAsync({ checkout_session: session.id })

      sessionStorage.removeItem(storageKey)
      checkout.destroy()

      router.replace({ name: 'user-account-billing' })
    } catch {
      isFailed.value = true
    } finally {
      isConfirming.value = false
    }
  }

  return {
    applyPromotionCode,
    confirm,
    error,
    isApplying,
    isConfirming,
    isLoading,
    lineItems,
    session: checkout.session,
    total,
  }
}

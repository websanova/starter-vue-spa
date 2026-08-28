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

export type CheckoutStep =
  | 'address'
  | 'payment'

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

  /**
   * Which step is open, and whether the card already on the customer is
   * the one being subscribed with. Hitting change on the card drops it,
   * since from that point the element is the source.
   */
  const step = ref<CheckoutStep>('address')
  const isSavedCard = ref<boolean>(true)

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

  /**
   * Whether this signup carries a trial. The API decided that when it
   * created the session, so the client reads the answer off it rather
   * than working out eligibility of its own.
   */
  const isTrial = computed(() => !!checkout.session.value?.recurring?.trial)

  /**
   * Tax reports as pending until the session carries an address to
   * calculate it against, and the address element does not push itself
   * onto the session before confirm. So the total on screen is the one
   * before tax until then, and it needs saying.
   */
  const isTaxPending = computed(() => {
    const session = checkout.session.value

    return !!session && session.tax.status !== 'ready'
  })

  /**
   * The card already on the customer, read off the session rather than
   * the local row, since confirming against it needs the id and only
   * the session carries one.
   */
  const savedCard = computed(() => checkout.session.value?.savedPaymentMethods?.[0] ?? null)

  /**
   * What each step shows once it is settled. An empty address summary
   * is what keeps the wizard on the address step, since it means the
   * session is carrying nothing to move on from.
   */
  const addressSummary = computed(() => {
    const value = checkout.session.value?.billingAddress?.address

    if (!value) {
      return ''
    }

    return [value.line1, value.line2, value.city, value.state, value.postal_code, value.country]
      .filter(Boolean)
      .join(', ')
  })

  const cardSummary = computed(() => {
    const card = savedCard.value

    if (!card || !isSavedCard.value) {
      return ''
    }

    return i18n.t('features.billing.payment_method.card', {
      brand: card.card.brand.charAt(0).toUpperCase() + card.card.brand.slice(1),
      last_four: card.card.last4,
    })
  })

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

    // An address already on the session is a step with nothing left to
    // collect, so the wizard opens past it.
    step.value = addressSummary.value ? 'payment' : 'address'

    await checkout.mount()
  }

  /**
   * Moves off the address step. The value is pushed onto the session on
   * the way, so the totals on the payment step carry tax for the
   * address just entered rather than for whatever the session had.
   */
  async function next() {
    isFailed.value = false
    stripeError.value = ''

    const { message } = await checkout.submitAddress()

    if (message) {
      stripeError.value = message
      return
    }

    step.value = 'payment'
  }

  function goTo(value: CheckoutStep) {
    step.value = value
  }

  /**
   * Replacing the card takes the saved one out of play, so the element
   * becomes what confirm reads and the summary gives way to it.
   */
  function changeCard() {
    isSavedCard.value = false
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

    const { message, session } = await checkout.confirm(
      isSavedCard.value ? savedCard.value?.id : undefined
    )

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
    addressSummary,
    applyPromotionCode,
    cardSummary,
    changeCard,
    confirm,
    error,
    goTo,
    isAddressComplete: checkout.isAddressComplete,
    isApplying,
    isConfirming,
    isLoading,
    isTaxPending,
    isTrial,
    lineItems,
    next,
    session: checkout.session,
    step,
    total,
  }
}

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCreateSubscriptionSession, useSyncSubscription } from '@/composables/api/subscription'
import { useBillingAddressDefaults } from '@/composables/support/billing'
import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useStripeCheckout } from '@shared/composables/primitives/useStripeCheckout'
import { useAuthService } from '@shared/composables/services/auth'
import { useI18n } from '@shared/plugins/i18n'
import { HttpError } from '@shared/plugins/http/client'
import type { Interval } from '@/models/plan'
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
 * a freshly loaded page, and the session being confirmed has to be the
 * one they left on rather than a replacement. Written on the way into
 * confirm and cleared as soon as it lands, so it only ever holds a
 * session with a confirm in flight. Scoped to the user so a session one
 * account left behind is not picked up by the next.
 */
const storagePrefix = 'subscribe.session'

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

  /**
   * The address on file is a prefill and nothing more. It is not written
   * to the customer and the element is free to be edited over it, since
   * the address that counts is whatever is in the element at confirm.
   */
  const billingAddressDefaults = useBillingAddressDefaults()

  let secret = ''

  const isLoading = ref<boolean>(true)
  const isConfirming = ref<boolean>(false)
  const isApplying = ref<boolean>(false)
  const isContinuing = ref<boolean>(false)
  const isFailed = ref<boolean>(false)
  const promotionError = ref<string>('')
  const stripeError = ref<string>('')

  /**
   * Which step is open, and whether the card already on the customer is
   * the one being subscribed with. Hitting change on the card drops it,
   * since from that point the element is the source.
   */
  const step = ref<CheckoutStep>('address')
  const isSavedCard = ref<boolean>(true)

  function storageKey(): string {
    return `${storagePrefix}.${auth.user.value?.id ?? ''}`
  }

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

    return i18n.t('features.text.payment_method.card', {
      brand: card.card.brand.charAt(0).toUpperCase() + card.card.brand.slice(1),
      last_four: card.card.last4,
    })
  })

  start()

  /**
   * A secret in storage means a confirm was in flight, so the customer
   * is coming back from a bank. That session is re-initialised rather
   * than replaced, since it may already have completed while they were
   * away and a new one would subscribe them twice.
   *
   * Every other visit creates. The create is where the server expires
   * the customer's other open sessions and refuses anyone already
   * subscribed, and reusing a session from a previous visit would walk
   * past both. A stored secret that will not load is spent or expired,
   * and a fresh one is opened over it.
   */
  async function start() {
    const stored = sessionStorage.getItem(storageKey())

    if (stored) {
      secret = stored

      if (await open(stored)) {
        return
      }
    }

    sessionStorage.removeItem(storageKey())

    // Not reachable. The page redirects itself off a query missing
    // either half of the plan it is supposed to be selling.
    if (!plan || !interval) {
      return
    }

    try {
      const { clientSecret } = await createSubscriptionSession.mutateAsync({ interval, plan })

      secret = clientSecret

      await open(clientSecret)
    } catch (err) {
      isLoading.value = false

      refuse(errorCode(err))
    }
  }

  /**
   * A refusal carries no secret, so there is nothing to mount either
   * way. Both of the codes that name a subscription already existing go
   * to billing, past due included, since nothing on the payment method
   * page settles what a failed renewal left open. Anything else stays
   * put with its message, since a provider that is unreachable is worth
   * trying again on.
   */
  function refuse(code: string) {
    if (code === 'already_subscribed' || code === 'payment_required') {
      router.replace({ name: 'user-account-billing' })
      return
    }

    isFailed.value = true
  }

  /**
   * The code rather than the message, since the message is translated
   * and moves with the locale.
   */
  function errorCode(err: unknown): string {
    return err instanceof HttpError
      ? (err.response.data as { error?: string }).error ?? ''
      : ''
  }

  /**
   * Without a session there is nothing to mount, so the failure is shown
   * rather than an empty page where the form should be. The elements go
   * up after the loading state drops, since that is the render their
   * targets first exist in.
   */
  async function open(clientSecret: string): Promise<boolean> {
    const { message, session } = await checkout.load(clientSecret, billingAddressDefaults.value)

    isLoading.value = false

    if (!session) {
      isFailed.value = true
      stripeError.value = message
      return false
    }

    if (session.status.type === 'complete') {
      await sync()
      return true
    }

    // An address already on the session is a step with nothing left to
    // collect, so the wizard opens past it.
    step.value = addressSummary.value ? 'payment' : 'address'

    await checkout.mount()

    return true
  }

  /**
   * Moves off the address step. The value is pushed onto the session on
   * the way, so the totals on the payment step carry tax for the
   * address just entered rather than for whatever the session had.
   */
  async function next() {
    isContinuing.value = true
    isFailed.value = false
    stripeError.value = ''

    try {
      const { message } = await checkout.submitAddress()

      if (message) {
        stripeError.value = message
        return
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
   * Going back to the address puts its element up again, since leaving
   * the step took it down.
   */
  function goTo(value: CheckoutStep) {
    step.value = value

    if (value === 'address') {
      checkout.mountAddress()
    }
  }

  /**
   * Replacing the card takes the saved one out of play, so the element
   * becomes what confirm reads and the summary gives way to it.
   */
  function changeCard() {
    isSavedCard.value = false
  }

  /**
   * A rejected code belongs to the field it was typed into rather than
   * to the page, since nothing else about the checkout has gone wrong.
   */
  async function applyPromotionCode(code: string) {
    isApplying.value = true
    promotionError.value = ''

    const { message } = await checkout.applyPromotionCode(code)

    promotionError.value = message
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

    // Held only for the length of the call. A challenge that leaves the
    // page comes back to nothing else, and anything that resolves here
    // clears it rather than leaving a session behind for the next visit.
    sessionStorage.setItem(storageKey(), secret)

    try {
      const { message, session } = await checkout.confirm(
        isSavedCard.value ? savedCard.value?.id : undefined
      )

      if (!session || session.status.type !== 'complete') {
        sessionStorage.removeItem(storageKey())
        stripeError.value = message
        isConfirming.value = false
        return
      }
    } catch (err) {
      sessionStorage.removeItem(storageKey())
      console.error(err)
      isFailed.value = true
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
      await syncSubscription.mutateAsync({ session: session.id })

      sessionStorage.removeItem(storageKey())
      checkout.destroy()

      router.replace({ name: 'user-account-billing' })
    } catch (err) {
      console.error(err)
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
    isContinuing,
    isLoading,
    isTaxPending,
    isTrial,
    lineItems,
    next,
    promotionError,
    session: checkout.session,
    step,
    total,
  }
}

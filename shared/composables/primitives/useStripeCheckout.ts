import { nextTick, onBeforeUnmount, shallowRef } from 'vue'
import { stripeAppearance, stripeClient } from '@shared/lib/stripe'
import type { Ref } from 'vue'
import type {
  StripeAddressElement,
  StripeCheckoutContact,
  StripeCheckoutElementsSdk,
  StripeCheckoutLoadActionsSuccess,
  StripeCheckoutSession,
  StripePaymentElement,
} from '@stripe/stripe-js'

interface StripeCheckoutOptions {
  addressTarget: Ref<HTMLElement | null>
  paymentTarget: Ref<HTMLElement | null>
}

export interface StripeCheckoutResult {
  message: string
  session: StripeCheckoutSession | null
}

/**
 * Drives a Checkout Session against its client secret. One session
 * carries the address, the card, the promotion code and the totals, so
 * both elements and every action come off the same instance rather than
 * being sequenced through separate intents.
 */
export function useStripeCheckout({ addressTarget, paymentTarget }: StripeCheckoutOptions) {
  let actions: StripeCheckoutLoadActionsSuccess | null = null
  let sdk: StripeCheckoutElementsSdk | null = null
  let addressElement: StripeAddressElement | null = null
  let paymentElement: StripePaymentElement | null = null

  const session = shallowRef<StripeCheckoutSession | null>(null)

  /**
   * Loads the session and the actions the page runs on, and reports its
   * opening state. The change event keeps the session in step after
   * that, since a promotion code moves the totals and the elements
   * report their own readiness to confirm through it.
   *
   * Nothing is mounted here. The caller is still showing a loading
   * state at this point, so the targets the elements go into are not in
   * the document yet.
   *
   * The address is only ever a prefill. The element does not write
   * itself onto the session, so what the customer leaves in it is read
   * at confirm rather than as they type.
   */
  async function load(clientSecret: string, billingAddress?: StripeCheckoutContact | null): Promise<StripeCheckoutResult> {
    const stripe = await stripeClient()

    if (!stripe) {
      return { message: '', session: null }
    }

    sdk = stripe.initCheckoutElementsSdk({
      clientSecret,
      elementsOptions: { appearance: stripeAppearance() },
      defaultValues: billingAddress ? { billingAddress } : undefined,
    })

    const result = await sdk.loadActions()

    if (result.type === 'error') {
      return { message: result.error.message, session: null }
    }

    actions = result.actions
    session.value = actions.getSession()

    sdk.on('change', (value) => {
      session.value = value
    })

    return { message: '', session: session.value }
  }

  /**
   * Puts both elements on the page. Run once the caller has dropped its
   * loading state, since the targets only exist from that render on.
   */
  async function mount() {
    if (!sdk) {
      return
    }

    addressElement = sdk.createBillingAddressElement()

    paymentElement = sdk.createPaymentElement({
      layout: { type: 'tabs' },
    })

    await nextTick()

    if (addressTarget.value) {
      addressElement.mount(addressTarget.value)
    }

    if (paymentTarget.value) {
      paymentElement.mount(paymentTarget.value)
    }
  }

  /**
   * Applies a promotion code to the session. The code belongs to the
   * session rather than to a payload of our own, so Stripe resolves it
   * and the totals move with it.
   */
  async function applyPromotionCode(code: string): Promise<StripeCheckoutResult> {
    if (!actions) {
      return { message: '', session: null }
    }

    const result = await actions.applyPromotionCode(code)

    if (result.type === 'error') {
      return { message: result.error.message, session: session.value }
    }

    return { message: '', session: result.session }
  }

  /**
   * Submits the address and the card, creates the subscription and
   * settles the first invoice, all in the one call. A bank challenge
   * either runs in a dialog or sends the customer to the return url, in
   * which case this never resolves. A refusal creates nothing, so the
   * elements are left standing and the same session is confirmed again.
   */
  async function confirm(): Promise<StripeCheckoutResult> {
    if (!actions) {
      return { message: '', session: null }
    }

    const result = await actions.confirm({ redirect: 'if_required' })

    if (result.type === 'error') {
      return { message: result.error.message, session: session.value }
    }

    return { message: '', session: result.session }
  }

  function destroy() {
    addressElement?.destroy()
    paymentElement?.destroy()
    addressElement = null
    paymentElement = null
    actions = null
    sdk = null
  }

  onBeforeUnmount(destroy)

  return {
    applyPromotionCode,
    confirm,
    destroy,
    load,
    mount,
    session,
  }
}

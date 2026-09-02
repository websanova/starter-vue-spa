import { nextTick, onBeforeUnmount } from 'vue'
import { useStripeAppearance } from '@shared/composables/primitives/useStripeAppearance'
import { stripeAppearance, stripeClient, stripeLocale } from '@shared/lib/stripe'
import type { Ref } from 'vue'
import type { StripeElements, StripeError, StripePaymentElement } from '@stripe/stripe-js'

interface StripePaymentOptions {
  target: Ref<HTMLElement | null>
  returnUrl: string
}

export interface StripeIntent {
  clientSecret: string
  type: 'payment' | 'setup'
}

interface StripeIntentResult {
  id: string
  status: string
  message: string
}

/**
 * Drives a Stripe payment element against an intent secret. The library
 * is pulled in on first use and the promise is held, so a second visit
 * to a payment screen reuses the script already on the page rather than
 * injecting it again.
 */
export function useStripePayment({ target, returnUrl }: StripePaymentOptions) {
  let elements: StripeElements | null = null
  let paymentElement: StripePaymentElement | null = null
  let intentType: StripeIntent['type'] = 'payment'

  useStripeAppearance(() => elements)

  /**
   * Throws rather than returning quietly when there is nothing to mount
   * against, so the caller shows the failure instead of an empty form
   * with a live submit button under it.
   */
  async function mount(intent: StripeIntent) {
    const stripe = await stripeClient()

    if (!stripe) {
      throw new Error('Stripe failed to load.')
    }

    intentType = intent.type

    elements = stripe.elements({
      clientSecret: intent.clientSecret,
      appearance: stripeAppearance(),
      locale: stripeLocale(),
    })

    paymentElement = elements.create('payment', {
      layout: 'tabs',
      wallets: { link: 'never' },
    })

    await nextTick()

    if (!target.value) {
      throw new Error('Stripe payment element has no target to mount into.')
    }

    paymentElement.mount(target.value)
  }

  /**
   * Reads the intent an operation left behind, so confirming and
   * returning from an authentication both report the same way. The id
   * comes back with it, since a stored payment method is only reachable
   * through the intent that stored it.
   *
   * A validation error carries no message, since the element has already
   * drawn it under the field it belongs to and repeating it above the
   * form says the same thing twice.
   */
  function toResult(id: string | undefined, status: string | undefined, error?: StripeError | null): StripeIntentResult {
    return {
      id: id ?? '',
      status: status ?? '',
      message: error?.type === 'validation_error' ? '' : error?.message ?? '',
    }
  }

  /**
   * Confirms the mounted element and reports where the intent landed.
   * Authentication that cannot run in a frame sends the customer to the
   * return url instead, in which case this never resolves. The element
   * is deliberately left in place on a refusal, since the intent stays
   * confirmable and the customer can correct the card and submit again
   * without a new secret.
   */
  async function confirm(): Promise<StripeIntentResult> {
    const stripe = await stripeClient()

    if (!stripe || !elements) {
      return { id: '', status: '', message: '' }
    }

    const params = {
      elements,
      confirmParams: { return_url: returnUrl },
      redirect: 'if_required' as const,
    }

    if (intentType === 'setup') {
      const { setupIntent, error } = await stripe.confirmSetup(params)

      return toResult(setupIntent?.id, setupIntent?.status, error)
    }

    const { paymentIntent, error } = await stripe.confirmPayment(params)

    return toResult(paymentIntent?.id, paymentIntent?.status, error)
  }

  /**
   * Reads the outcome of an intent the customer was redirected away to
   * authenticate. Nothing is confirmed here, the authentication is
   * already over by the time Stripe sends them back and only the
   * resulting status is left to read.
   */
  async function retrieve(intent: StripeIntent): Promise<StripeIntentResult> {
    const stripe = await stripeClient()

    if (!stripe) {
      return { id: '', status: '', message: '' }
    }

    if (intent.type === 'setup') {
      const { setupIntent } = await stripe.retrieveSetupIntent(intent.clientSecret)

      return toResult(setupIntent?.id, setupIntent?.status, setupIntent?.last_setup_error)
    }

    const { paymentIntent } = await stripe.retrievePaymentIntent(intent.clientSecret)

    return toResult(paymentIntent?.id, paymentIntent?.status, paymentIntent?.last_payment_error)
  }

  function destroy() {
    paymentElement?.destroy()
    paymentElement = null
    elements = null
  }

  onBeforeUnmount(destroy)

  return {
    confirm,
    destroy,
    mount,
    retrieve,
  }
}

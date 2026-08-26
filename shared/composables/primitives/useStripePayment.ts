import { nextTick, onBeforeUnmount } from 'vue'
import { loadStripe } from '@stripe/stripe-js/pure'
import { useI18n } from '@shared/plugins/i18n'
import { oklchToHex } from '@shared/lib/color'
import type { Ref } from 'vue'
import type { Stripe, StripeElementLocale, StripeElements, StripeError, StripePaymentElement } from '@stripe/stripe-js'

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
 * App locales do not line up with the set Stripe accepts, which is
 * language codes plus a few regional ones. The mapping is explicit so
 * that adding an app locale is a deliberate choice here rather than a
 * silent fall back to the browser.
 *
 * https://docs.stripe.com/js/appendix/supported_locales
 */
const locales: Record<string, StripeElementLocale> = {
  'en-US': 'en',
  'en-CA': 'en',
  'fr-CA': 'fr-CA',
}

let stripe: Promise<Stripe | null> | null = null

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

  function client() {
    if (!stripe) {
      stripe = loadStripe(import.meta.env.VITE_STRIPE_KEY)
    }

    return stripe
  }

  /**
   * Builds the element appearance from the theme tokens so the frame is
   * styled from the same source as the rest of the app. Stripe has no
   * access to the page custom properties and only takes hex, so the
   * tokens are resolved and converted here. Variables cover the frame
   * as a whole, rules pick out the parts needing their own surface.
   */
  function appearance() {
    const styles = getComputedStyle(document.documentElement)

    const token = (name: string) => styles.getPropertyValue(name).trim()
    const color = (name: string) => oklchToHex(token(name))

    return {
      variables: {
        borderRadius: token('--radius'),
        colorBackground: color('--background'),
        colorDanger: color('--destructive'),
        colorPrimary: color('--primary'),
        colorText: color('--foreground'),
        colorTextPlaceholder: color('--muted-foreground'),
        colorTextSecondary: color('--muted-foreground'),
      },
      rules: {
        '.Input': {
          backgroundColor: color('--background')
        },
        '.Tab': {
          backgroundColor: color('--background'),
          color: color('--foreground'),
        },
        '.Tab--selected': {
          backgroundColor: color('--accent'),
          color: color('--foreground'),
        },
      },
    }
  }

  async function mount(intent: StripeIntent) {
    const stripeClient = await client()

    if (!stripeClient) {
      return
    }

    intentType = intent.type

    elements = stripeClient.elements({
      clientSecret: intent.clientSecret,
      appearance: appearance(),
      locale: locales[useI18n().locale.value] ?? 'auto',
    })

    paymentElement = elements.create('payment', {
      layout: 'tabs',
      wallets: { link: 'never' },
    })

    await nextTick()

    if (!target.value) {
      return
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
    const stripeClient = await client()

    if (!stripeClient || !elements) {
      return { id: '', status: '', message: '' }
    }

    const params = {
      elements,
      confirmParams: { return_url: returnUrl },
      redirect: 'if_required' as const,
    }

    if (intentType === 'setup') {
      const { setupIntent, error } = await stripeClient.confirmSetup(params)

      return toResult(setupIntent?.id, setupIntent?.status, error)
    }

    const { paymentIntent, error } = await stripeClient.confirmPayment(params)

    return toResult(paymentIntent?.id, paymentIntent?.status, error)
  }

  /**
   * Reads the outcome of an intent the customer was redirected away to
   * authenticate. Nothing is confirmed here, the authentication is
   * already over by the time Stripe sends them back and only the
   * resulting status is left to read.
   */
  async function retrieve(intent: StripeIntent): Promise<StripeIntentResult> {
    const stripeClient = await client()

    if (!stripeClient) {
      return { id: '', status: '', message: '' }
    }

    if (intent.type === 'setup') {
      const { setupIntent } = await stripeClient.retrieveSetupIntent(intent.clientSecret)

      return toResult(setupIntent?.id, setupIntent?.status, setupIntent?.last_setup_error)
    }

    const { paymentIntent } = await stripeClient.retrievePaymentIntent(intent.clientSecret)

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

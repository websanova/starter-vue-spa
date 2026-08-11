import { nextTick, onBeforeUnmount } from 'vue'
import { loadStripe } from '@stripe/stripe-js/pure'
import { useI18n } from '@shared/plugins/i18n'
import { oklchToHex } from '@shared/lib/color'
import type { Ref } from 'vue'
import type { Stripe, StripeElementLocale, StripeElements, StripePaymentElement } from '@stripe/stripe-js'

interface StripePaymentOptions {
  target: Ref<HTMLElement | null>
  returnUrl: string
}

export interface StripeIntent {
  clientSecret: string
  type: 'payment' | 'setup'
}

interface StripeIntentResult {
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
   * Confirms the mounted element and resolves to a message when the
   * payment was refused. Authentication that cannot run in a frame
   * sends the customer to the return url instead, in which case this
   * never resolves. The element is deliberately left in place on a
   * refusal, since the intent stays confirmable and the customer can
   * correct the card and submit again without a new secret.
   */
  async function confirm() {
    const stripeClient = await client()

    if (!stripeClient || !elements) {
      return ''
    }

    const { error } = intentType === 'setup'
      ? await stripeClient.confirmSetup({
        elements,
        confirmParams: { return_url: returnUrl },
        redirect: 'if_required',
      })
      : await stripeClient.confirmPayment({
        elements,
        confirmParams: { return_url: returnUrl },
        redirect: 'if_required',
      })

    return error?.message ?? ''
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
      return { status: '', message: '' }
    }

    if (intent.type === 'setup') {
      const { setupIntent } = await stripeClient.retrieveSetupIntent(intent.clientSecret)

      return {
        status: setupIntent?.status ?? '',
        message: setupIntent?.last_setup_error?.message ?? '',
      }
    }

    const { paymentIntent } = await stripeClient.retrievePaymentIntent(intent.clientSecret)

    return {
      status: paymentIntent?.status ?? '',
      message: paymentIntent?.last_payment_error?.message ?? '',
    }
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

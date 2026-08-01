import { nextTick, onBeforeUnmount } from 'vue'
import { loadStripe } from '@stripe/stripe-js/pure'
import type { Stripe, StripeEmbeddedCheckout } from '@stripe/stripe-js'

interface StripeCheckoutOptions {
  selector: string
  onComplete: () => void
}

let stripe: Promise<Stripe | null> | null = null

/**
 * Mounts a Stripe embedded checkout against a session secret. The library
 * is pulled in on first use and the promise is held, so a second visit to
 * a payment screen reuses the script already on the page rather than
 * injecting it again.
 */
export function useStripeCheckout({ selector, onComplete }: StripeCheckoutOptions) {
  let embeddedCheckout: StripeEmbeddedCheckout | null = null

  async function mount(clientSecret: string) {
    if (!stripe) {
      stripe = loadStripe(import.meta.env.VITE_STRIPE_KEY)
    }

    const client = await stripe

    if (!client) {
      return
    }

    await nextTick()

    embeddedCheckout = await client.createEmbeddedCheckoutPage({
      clientSecret,
      onComplete,
    })

    embeddedCheckout.mount(selector)
  }

  function destroy() {
    embeddedCheckout?.destroy()
    embeddedCheckout = null
  }

  onBeforeUnmount(destroy)

  return {
    destroy,
    mount,
  }
}

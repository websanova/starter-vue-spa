import { loadStripe } from '@stripe/stripe-js/pure'
import type { Stripe } from '@stripe/stripe-js'

let stripe: Promise<Stripe | null> | null = null

/**
 * Loads Stripe on demand and holds the promise so returning to a payment
 * screen reuses the script that is already on the page. The pure entry
 * point keeps the injection back until this runs, which is what keeps
 * Stripe out of every route that never takes a payment.
 */
export function useStripe() {
  if (!stripe) {
    stripe = loadStripe(import.meta.env.VITE_STRIPE_KEY)
  }

  return stripe
}

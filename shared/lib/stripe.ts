import { loadStripe } from '@stripe/stripe-js/pure'
import { useI18n } from '@shared/plugins/i18n'
import { oklchToHex } from './color'
import type { Stripe, StripeElementLocale } from '@stripe/stripe-js'

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
 * The library is pulled in on first use and the promise is held, so a
 * second visit to a payment screen reuses the script already on the
 * page rather than injecting it again.
 */
export function stripeClient() {
  if (!stripe) {
    stripe = loadStripe(import.meta.env.VITE_STRIPE_KEY)
  }

  return stripe
}

export function stripeLocale(): StripeElementLocale {
  return locales[useI18n().locale.value] ?? 'auto'
}

/**
 * Builds the element appearance from the theme tokens so the frame is
 * styled from the same source as the rest of the app. Stripe has no
 * access to the page custom properties and only takes hex, so the
 * tokens are resolved and converted here. Variables cover the frame
 * as a whole, rules pick out the parts needing their own surface.
 */
export function stripeAppearance() {
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

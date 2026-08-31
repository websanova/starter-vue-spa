import { loadStripe } from '@stripe/stripe-js/pure'
import { useI18n } from '@shared/plugins/i18n'
import { oklchToColor } from './color'
import type { Appearance, Stripe, StripeElementLocale } from '@stripe/stripe-js'

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

/**
 * The breakpoint our input steps its font size down at, mirroring the
 * md:text-sm it carries. An element cannot hold a media query, so the
 * appearance is built against whichever side of this the viewport is
 * on and has to be rebuilt when it crosses.
 */
export const appearanceBreakpoint = '(min-width: 48rem)'

/**
 * The metrics our own input is drawn with. Height is not one of the
 * properties the appearance API accepts, so the element is sized by
 * padding instead and these are what that padding is worked back from.
 */
const inputHeight = 36
const inputBorder = 1
const inputPaddingX = 12

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
 * access to the page custom properties, so the tokens are resolved and
 * converted here. Variables cover the frame as a whole, rules pick out
 * the parts needing their own surface.
 *
 * Custom properties read back as their literal text, so anything built
 * out of calc() comes back as the calc itself and references variables
 * that do not exist inside the Stripe frame. The probe is what those
 * are measured against, and it only has to live as long as it takes to
 * build the object.
 */
export function stripeAppearance(): Appearance {
  const styles = getComputedStyle(document.documentElement)
  const probe = document.createElement('div')

  probe.style.position = 'absolute'
  probe.style.visibility = 'hidden'

  document.body.appendChild(probe)

  const color = (name: string, alpha?: number) => oklchToColor(styles.getPropertyValue(name).trim(), alpha)

  const style = (property: string, value: string) => {
    probe.style.setProperty(property, value)

    return getComputedStyle(probe).getPropertyValue(property)
  }

  /**
   * Our input steps from text-base down to text-sm at the breakpoint,
   * and the 16px below it is also what stops ios zooming the page when
   * a field takes focus.
   */
  const isCompact = window.matchMedia(appearanceBreakpoint).matches
  const fontSize = isCompact ? 14 : 16
  const lineHeight = isCompact ? 20 : 24
  const paddingY = (inputHeight - inputBorder * 2 - lineHeight) / 2

  /**
   * Light leaves the field on the page background, dark lifts it the
   * way dark:bg-input/30 does. The token already carries an alpha of
   * its own there, which the multiply preserves.
   */
  const isDark = document.documentElement.classList.contains('dark')
  const background = isDark ? color('--input', 0.3) : color('--background')
  const invalidRing = color('--destructive', isDark ? 0.4 : 0.2)

  const border = (value: string) => `${inputBorder}px solid ${value}`
  const ring = (value: string) => `0 0 0 3px ${value}`
  const shadow = style('box-shadow', 'var(--shadow-xs, 0 1px 2px 0 rgb(0 0 0 / 0.05))')

  const appearance: Appearance = {
    labels: 'above',
    variables: {
      borderRadius: style('border-radius', 'var(--radius-md)'),
      colorBackground: color('--background'),
      colorDanger: color('--destructive'),
      colorPrimary: color('--primary'),
      colorText: color('--foreground'),
      colorTextPlaceholder: color('--muted-foreground'),
      colorTextSecondary: color('--muted-foreground'),
      fontFamily: styles.fontFamily,
      fontLineHeight: `${lineHeight}px`,
      fontSizeBase: `${fontSize}px`,
      gridColumnSpacing: '16px',
      gridRowSpacing: '16px',
      iconChevronDownColor: color('--muted-foreground'),
      iconChevronDownHoverColor: color('--foreground'),
      iconColor: color('--muted-foreground'),
      iconHoverColor: color('--foreground'),
      inputBoxShadow: shadow,
      inputColorBorder: color('--input'),
      inputFocusBoxShadow: ring(color('--ring', 0.5)),
      inputFocusColorBorder: color('--ring'),
      labelColorText: color('--foreground'),
      labelFontSize: '14px',
      labelFontWeight: '500',
      labelSpacing: '8px',
    },
    rules: {
      '.Error': {
        fontSize: '14px',
      },
      '.Input': {
        backgroundColor: background,
        padding: `${paddingY}px ${inputPaddingX}px`,
        transition: 'border-color 0.15s, box-shadow 0.15s',
      },
      '.Input--invalid': {
        border: border(color('--destructive')),
        boxShadow: ring(invalidRing),
        color: color('--foreground'),
      },
      '.Input--invalid:focus': {
        border: border(color('--destructive')),
        boxShadow: ring(invalidRing),
      },
      '.Label': {
        lineHeight: '1',
      },
      '.Tab': {
        backgroundColor: background,
        border: border(color('--input')),
        boxShadow: shadow,
        color: color('--foreground'),
      },
      '.Tab:hover': {
        backgroundColor: color('--accent'),
        color: color('--foreground'),
      },
      '.Tab--selected': {
        backgroundColor: color('--accent'),
        border: border(color('--ring')),
        color: color('--foreground'),
      },
      '.Tab--selected:focus': {
        boxShadow: ring(color('--ring', 0.5)),
      },
    },
  }

  probe.remove()

  return appearance
}

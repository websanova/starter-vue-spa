import { watch } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { useColorScheme } from '@shared/composables/support/useColorScheme'
import { appearanceBreakpoint, stripeAppearance } from '@shared/lib/stripe'
import type { StripeElements } from '@stripe/stripe-js'

/**
 * Keeps a mounted elements group on the current appearance. The frame
 * has no access to the page custom properties, so what it was given is
 * a snapshot of the tokens taken when the group was created, and a
 * scheme or breakpoint change has to be pushed in rather than
 * cascading the way it does everywhere else.
 *
 * The group is read through a getter, since it only exists once the
 * element has mounted and the watcher goes up before that.
 */
export function useStripeAppearance(elements: () => StripeElements | null) {
  const { isDark } = useColorScheme()
  const isCompact = useMediaQuery(appearanceBreakpoint)

  watch([isDark, isCompact], () => {
    elements()?.update({ appearance: stripeAppearance() })
  })
}

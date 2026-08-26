import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCreatePaymentMethodIntent } from '@/composables/api/paymentMethod'
import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useAuthService } from '@shared/composables/services/auth'
import type { StripeIntent } from '@shared/composables/primitives/useStripePayment'

export type CheckoutStep =
  | 'address'
  | 'confirm'
  | 'payment'

/**
 * Drives the subscribe wizard. Nothing about the plan lives here, only
 * which of the three steps is open and the setup intent the card step
 * needs, since the plan travels on the query and is settled at the end
 * rather than along the way.
 */
export function useCheckout() {
  const auth = useAuthService()
  const route = useRoute()
  const createIntent = useCreatePaymentMethodIntent()

  /**
   * Nothing shows until the opening step is settled, since landing on
   * the card step has an intent to open first and rendering the form
   * before it arrives leaves an element with no secret to mount against.
   */
  const step = ref<CheckoutStep | null>(null)
  const intent = ref<StripeIntent | null>(null)
  const error = useMutationError(createIntent)

  /**
   * A secret on the query means the customer is coming back from a bank
   * challenge with a payment method already stored. That has to win over
   * the checks below, which see no card on file yet and would open a
   * second intent over one that is already confirmed. The element reads
   * the secret off the query itself, so no intent is opened here.
   */
  if (route.query.setup_intent_client_secret) {
    step.value = 'payment'
  } else {
    goTo(resolve())
  }

  /**
   * The first step that is not already done. Both settled means there is
   * nothing left to collect and the wizard opens on confirm.
   */
  function resolve(): CheckoutStep {
    const user = auth.user.value

    if (!user?.isBillingAddress) {
      return 'address'
    }

    if (!user.hasPaymentMethod) {
      return 'payment'
    }

    return 'confirm'
  }

  /**
   * Opens the intent on the way into the card step rather than once it
   * is showing. The API checks the address against Stripe to get here,
   * so a location it cannot place is reported on the step that can fix
   * it instead of on a card form that was never going to mount.
   */
  async function open() {
    try {
      const { clientSecret } = await createIntent.mutateAsync()

      intent.value = { clientSecret, type: 'setup' }
      step.value = 'payment'
    } catch {
      step.value = 'address'
    }
  }

  /**
   * Run once a step reports itself done. Resolving again rather than
   * advancing by position is what sends a customer who came from the
   * summary back to confirm instead of walking them through the rest of
   * the wizard a second time.
   */
  function next() {
    goTo(resolve())
  }

  function goTo(value: CheckoutStep) {
    if (value === 'payment') {
      open()
      return
    }

    step.value = value
  }

  return {
    error,
    goTo,
    intent,
    isOpening: createIntent.isPending,
    next,
    step,
  }
}

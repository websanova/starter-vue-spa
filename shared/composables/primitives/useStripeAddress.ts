import { nextTick, onBeforeUnmount, ref } from 'vue'
import { stripeAppearance, stripeClient, stripeLocale } from '@shared/lib/stripe'
import type { Ref } from 'vue'
import type { StripeAddressElement, StripeAddressElementOptions } from '@stripe/stripe-js'

interface StripeAddressOptions {
  target: Ref<HTMLElement | null>
}

/**
 * Drives a Stripe address element. Nothing entered here goes to Stripe
 * from the browser, the element is a form widget and its value is read
 * back out, so there is no intent, no client secret and nothing to
 * confirm. Whoever mounts it decides where the address ends up.
 *
 * The element owns the shape of an address. Country is an ISO alpha-2
 * select and the fields follow whatever is picked, which is the whole
 * reason it is here rather than a form of our own.
 */
export function useStripeAddress({ target }: StripeAddressOptions) {
  let addressElement: StripeAddressElement | null = null

  const isComplete = ref<boolean>(false)

  /**
   * Reports whether the element went up, since a dead stripe.js leaves
   * nothing to type into and the caller has to show that rather than an
   * empty page where the form should be.
   */
  async function mount(defaultValues?: StripeAddressElementOptions['defaultValues']) {
    const stripe = await stripeClient()

    if (!stripe) {
      return false
    }

    const elements = stripe.elements({
      appearance: stripeAppearance(),
      locale: stripeLocale(),
    })

    addressElement = elements.create('address', {
      mode: 'billing',
      defaultValues,
    })

    /**
     * Completeness is what says the address is ready to be sent, so it
     * is tracked as the user types rather than worked out at submit.
     */
    addressElement.on('change', (event) => {
      isComplete.value = event.complete
    })

    await nextTick()

    if (!target.value) {
      return false
    }

    addressElement.mount(target.value)

    return true
  }

  /**
   * Reads what the user left in the element. The element holds the only
   * copy, so this is the one way to get at it, and it is asked for at
   * submit rather than kept in step on every keystroke.
   */
  async function getValue() {
    if (!addressElement) {
      return null
    }

    const { value } = await addressElement.getValue()

    return value
  }

  function destroy() {
    addressElement?.destroy()
    addressElement = null
  }

  onBeforeUnmount(destroy)

  return {
    destroy,
    getValue,
    isComplete,
    mount,
  }
}

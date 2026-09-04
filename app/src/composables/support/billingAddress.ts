import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUpdateBillingAddress } from '@/composables/api/billing'
import { useBillingAddressDefaults } from '@/composables/support/billing'
import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useStripeAddress } from '@shared/composables/primitives/useStripeAddress'
import { useI18n } from '@shared/plugins/i18n'
import type { Ref } from 'vue'

interface BillingAddressOptions {
  target: Ref<HTMLElement | null>
}

/**
 * Drives the billing address page. The element is a form widget and
 * nothing it collects leaves the browser on its own, so there is no
 * intent to open and nothing to confirm. Its value is read at submit
 * and the API is what pushes it to the customer, which is also what
 * decides whether the address is any good.
 */
export function useBillingAddressForm({ target }: BillingAddressOptions) {
  const i18n = useI18n()
  const router = useRouter()

  const update = useUpdateBillingAddress()

  const defaults = useBillingAddressDefaults()
  const address = useStripeAddress({ target })

  const isLoading = ref<boolean>(true)
  const isFailed = ref<boolean>(false)

  const mutationError = useMutationError(update)

  /**
   * Anything that is not an HTTP error carries no message of its own, a
   * dead stripe.js among them. Those still get a sentence rather than a
   * page with nothing on it where the form should be.
   */
  const error = computed(() => {
    if (mutationError.value) {
      return mutationError.value
    }

    return isFailed.value ? i18n.t('features.form.stripe_address.failed') : ''
  })

  start()

  /**
   * The element is mounted while the loading state is still up, so its
   * target has to be in the document from the first render rather than
   * behind the loader.
   */
  async function start() {
    const mounted = await address.mount(defaults.value ?? undefined)

    isLoading.value = false
    isFailed.value = !mounted
  }

  /**
   * The element holds the only copy of the address, so it is asked for
   * here rather than kept in step on every keystroke. A rejection
   * leaves the element standing and the user corrects whatever Stripe
   * named and submits again.
   */
  async function submit() {
    const value = await address.getValue()

    if (!value) {
      return
    }

    isFailed.value = false

    try {
      await update.mutateAsync({
        city: value.address.city,
        country: value.address.country,
        line1: value.address.line1,
        line2: value.address.line2 || undefined,
        name: value.name ?? '',
        postal_code: value.address.postal_code,
        state: value.address.state || undefined,
      })

      router.replace({ name: 'user-account-billing' })
    } catch (err) {
      console.error(err)
      isFailed.value = true
    }
  }

  return {
    error,
    isComplete: address.isComplete,
    isLoading,
    isPending: update.isPending,
    submit,
  }
}

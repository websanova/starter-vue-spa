import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useValidatedForm } from '@shared/composables/primitives/useValidatedForm'
import { AddressRules } from '@shared/rules/address'
import { useAuthStore } from '@shared/stores/auth'
import { useUpdateBillingAddress } from '@/composables/api/billing'

interface Options {
  onSuccess?: () => void
}

/**
 * The address is pushed to Stripe before anything is written locally,
 * so a rejection carries a message rather than field errors. It is
 * exposed alongside the form so the caller has somewhere to show it.
 */
export function useBillingAddressForm(options: Options = {}) {
  const store = useAuthStore()
  const update = useUpdateBillingAddress()
  const address = store.user?.billingAddress

  return {
    ...useValidatedForm({
      rules: {
        line1: AddressRules.line1(),
        line2: AddressRules.line2(),
        city: AddressRules.city(),
        postal_code: AddressRules.postalCode(),
        country: AddressRules.country(),
      },
      initial: {
        line1: address?.line1 ?? '',
        line2: address?.line2 ?? '',
        city: address?.city ?? '',
        postal_code: address?.postalCode ?? '',
        country: address?.country ?? '',
      },
      onSubmit: update.mutateAsync,
      onSuccess: options.onSuccess,
    }),
    error: useMutationError(update),
  }
}

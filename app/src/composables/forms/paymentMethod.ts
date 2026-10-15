import { useMutationAction } from '@shared/composables/primitives/useMutationAction'
import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useI18n } from '@shared/plugins/i18n'
import { useDeletePaymentMethod } from '@/composables/api/paymentMethod'

export function useDeletePaymentMethodForm(onSuccess?: () => void) {
  const i18n = useI18n()
  const mutation = useDeletePaymentMethod()

  return {
    ...useMutationAction({
      onSubmit: () => mutation.mutateAsync(),
      onSuccess,
    }),
    error: useMutationError(mutation, i18n.t('features.dialog.payment_method_delete.note_failed')),
  }
}

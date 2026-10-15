<script setup lang="ts">
  import { useSubscription } from '@/composables/current/useSubscription'
  import { useDeletePaymentMethodForm } from '@/composables/forms/paymentMethod'
  import { DialogAlert } from '@shared/components/common/DialogAlert'

  const open = defineModel<boolean>('open', { default: false })

  /**
   * The gate is read again here rather than passed in, since the dialog
   * is what refuses and the control that opened it only decides whether
   * there is a card to act on.
   */
  const { isChargeable } = useSubscription()

  const { submit, isPending, error } = useDeletePaymentMethodForm(() => {
    open.value = false
  })
</script>

<template>
  <DialogAlert
    v-model:open="open"
    color="destructive"
    :title="$t('features.dialog.payment_method_delete.title')"
    :body="$t(`features.dialog.payment_method_delete.${isChargeable ? 'note_blocked' : 'note'}`)"
    :ok-label="$t('features.lbl.delete')"
    :show-ok="!isChargeable"
    :pending="isPending"
    :error="error"
    @ok="submit"
  />
</template>

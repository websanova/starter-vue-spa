<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useDeletePaymentMethod } from '@/composables/api/paymentMethod'
  import { useSubscription } from '@/composables/support/subscription'
  import { useMutationError } from '@shared/composables/primitives/useMutationError'
  import { useI18n } from '@shared/plugins/i18n'
  import { DialogAlert } from '@shared/components/common/DialogAlert'

  const open = defineModel<boolean>('open', { default: false })

  const i18n = useI18n()

  /**
   * The gate is read again here rather than passed in, since the dialog
   * is what refuses and the control that opened it only decides whether
   * there is a card to act on.
   */
  const { isChargeable } = useSubscription()

  const remove = useDeletePaymentMethod()

  const isFailed = ref<boolean>(false)
  const isPending = remove.isPending

  const mutationError = useMutationError(remove)

  /**
   * A refusal comes back as an HTTP error and carries its own sentence.
   * Anything else, a dropped connection among them, still gets a line
   * rather than a dialog that looks like nothing happened.
   */
  const error = computed(() => {
    if (mutationError.value) {
      return mutationError.value
    }

    return isFailed.value ? i18n.t('features.dialog.payment_method_delete.note_failed') : ''
  })

  async function submit() {
    isFailed.value = false

    try {
      await remove.mutateAsync()

      open.value = false
    } catch (err) {
      console.error(err)
      isFailed.value = true
    }
  }
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

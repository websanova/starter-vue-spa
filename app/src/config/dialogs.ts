import PaymentMethodDeleteDialog from '@/features/dialogs/PaymentMethodDelete.vue'

/**
 * Every dialog the app can open through useDialogService. The props each one
 * takes are read off its own defineProps, so they are only declared once.
 */
export const dialogs = {
  paymentMethodDelete: PaymentMethodDeleteDialog,
}

export type DialogName = keyof typeof dialogs

export type DialogProps<K extends DialogName> = Omit<InstanceType<(typeof dialogs)[K]>['$props'], 'open' | 'onUpdate:open'>

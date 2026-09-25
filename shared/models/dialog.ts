import type { dialogs } from '@/config/dialogs'

export type DialogName = keyof typeof dialogs

/**
 * Each dialog declares its props in its own defineProps, which is not
 * exported, so the instance type is the only way to read them from here.
 */
type DialogInstance<K extends DialogName> = InstanceType<(typeof dialogs)[K]>

/**
 * The second argument to useDialogService open(). Vue folds a dialog's
 * defineModel('open') into $props as both an open prop and an onUpdate:open
 * handler, and features/managers/Dialogs.vue owns that v-model, so both halves
 * come off and what is left is the dialog's own arguments.
 */
export type DialogProps<K extends DialogName> = Omit<DialogInstance<K>['$props'], 'open' | 'onUpdate:open'>

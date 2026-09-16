import type { dialogs } from '@/config/dialogs'

export type DialogName = keyof typeof dialogs

type DialogInstance<K extends DialogName> = InstanceType<(typeof dialogs)[K]>

// Props the dialog declares, minus the open v-model the manager controls
export type DialogProps<K extends DialogName> = Omit<DialogInstance<K>['$props'], 'open' | 'onUpdate:open'>

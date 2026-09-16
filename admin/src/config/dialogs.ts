import UserDeleteDialog from '@/features/dialogs/UserDelete.vue'

/**
 * Every dialog the app can open through useDialogService. The props each one
 * takes are read off its own defineProps, so they are only declared once.
 */
export const dialogs = {
  userDelete: UserDeleteDialog,
}

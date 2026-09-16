import BookmarkCreateDialog from '@/features/dialogs/BookmarkCreate.vue'
import BookmarkDeleteDialog from '@/features/dialogs/BookmarkDelete.vue'
import BookmarkUpdateDialog from '@/features/dialogs/BookmarkUpdate.vue'
import PaymentMethodDeleteDialog from '@/features/dialogs/PaymentMethodDelete.vue'
import TagCreateDialog from '@/features/dialogs/TagCreate.vue'
import TagDeleteDialog from '@/features/dialogs/TagDelete.vue'
import TagUpdateDialog from '@/features/dialogs/TagUpdate.vue'

/**
 * Every dialog the app can open through useDialogService. The props each one
 * takes are read off its own defineProps, so they are only declared once.
 */
export const dialogs = {
  bookmarkCreate: BookmarkCreateDialog,
  bookmarkDelete: BookmarkDeleteDialog,
  bookmarkUpdate: BookmarkUpdateDialog,
  paymentMethodDelete: PaymentMethodDeleteDialog,
  tagCreate: TagCreateDialog,
  tagDelete: TagDeleteDialog,
  tagUpdate: TagUpdateDialog,
}

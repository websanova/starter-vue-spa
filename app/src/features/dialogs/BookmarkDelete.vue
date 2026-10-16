<script setup lang="ts">
  import { useDeleteBookmarkForm } from '@/composables/forms/bookmarks'
  import { DialogAlert } from '@shared/components/common/DialogAlert'
  import type { Bookmark } from '@/models/bookmark'

  const props = defineProps<{
    bookmark: Bookmark
  }>()

  const open = defineModel<boolean>('open', { default: false })

  const { submit, isPending, error } = useDeleteBookmarkForm(props.bookmark, () => {
    open.value = false
  })
</script>

<template>
  <DialogAlert
    v-model:open="open"
    color="destructive"
    :title="$t('features.dialog.bookmark_delete.title')"
    :ok-label="$t('features.lbl.delete')"
    :pending="isPending"
    :error="error"
    @ok="submit"
  >
    <i18n-t
      keypath="features.dialog.bookmark_delete.note"
      scope="global"
      tag="span"
    >
      <strong>"{{ bookmark.title }}"</strong>
    </i18n-t>
  </DialogAlert>
</template>

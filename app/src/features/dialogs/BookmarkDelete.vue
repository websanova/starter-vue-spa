<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useDeleteBookmark } from '@/composables/api/bookmarks'
  import { useMutationError } from '@shared/composables/primitives/useMutationError'
  import { useI18n } from '@shared/plugins/i18n'
  import { DialogAlert } from '@shared/components/common/DialogAlert'
  import type { Bookmark } from '@/models/bookmark'

  const props = defineProps<{
    bookmark: Bookmark
  }>()

  const open = defineModel<boolean>('open', { default: false })

  const i18n = useI18n()

  const remove = useDeleteBookmark()

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

    return isFailed.value ? i18n.t('features.dialog.bookmark_delete.note_failed') : ''
  })

  async function submit() {
    isFailed.value = false

    try {
      await remove.mutateAsync(props.bookmark.id)

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
    :title="$t('features.dialog.bookmark_delete.title')"
    :ok-label="$t('features.lbl.delete')"
    :pending="isPending"
    :error="error"
    @ok="submit"
  >
    <i18n-t
      keypath="features.dialog.bookmark_delete.note"
      tag="span"
    >
      <strong>"{{ bookmark.title }}"</strong>
    </i18n-t>
  </DialogAlert>
</template>

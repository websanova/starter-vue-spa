<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import { useDeleteTagForm } from '@/composables/forms/tags'
  import { DialogAlert } from '@shared/components/common/DialogAlert'
  import type { Tag } from '@/models/tag'

  const props = defineProps<{
    tag: Tag
  }>()

  const open = defineModel<boolean>('open', { default: false })

  const route = useRoute()
  const router = useRouter()

  /**
   * Filtering by a tag that no longer exists would leave an empty list,
   * so deleting the active tag falls back to all bookmarks.
   */
  const { submit, isPending, error } = useDeleteTagForm(props.tag, () => {
    if (route.query.tag_id === String(props.tag.id)) {
      router.push({ name: 'user-bookmarks' })
    }

    open.value = false
  })
</script>

<template>
  <DialogAlert
    v-model:open="open"
    color="destructive"
    :title="$t('features.dialog.tag_delete.title')"
    :ok-label="$t('features.lbl.delete')"
    :pending="isPending"
    :error="error"
    @ok="submit"
  >
    <i18n-t
      keypath="features.dialog.tag_delete.note"
      scope="global"
      tag="span"
    >
      <strong>"{{ tag.name }}"</strong>
    </i18n-t>
  </DialogAlert>
</template>

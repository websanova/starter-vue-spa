<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useDeleteTag } from '@/composables/api/tags'
  import { useMutationError } from '@shared/composables/primitives/useMutationError'
  import { useI18n } from '@shared/plugins/i18n'
  import { DialogAlert } from '@shared/components/common/DialogAlert'
  import type { Tag } from '@/models/tag'

  const props = defineProps<{
    tag: Tag
  }>()

  const open = defineModel<boolean>('open', { default: false })

  const i18n = useI18n()
  const route = useRoute()
  const router = useRouter()

  const remove = useDeleteTag()

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

    return isFailed.value ? i18n.t('features.dialog.tag_delete.note_failed') : ''
  })

  /**
   * Filtering by a tag that no longer exists would leave an empty list,
   * so deleting the active tag falls back to all bookmarks.
   */
  async function submit() {
    isFailed.value = false

    try {
      await remove.mutateAsync(props.tag.id)

      if (route.query.tag_id === String(props.tag.id)) {
        router.push({ name: 'user-bookmarks' })
      }

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
    :title="$t('features.dialog.tag_delete.title')"
    :ok-label="$t('features.lbl.delete')"
    :pending="isPending"
    :error="error"
    @ok="submit"
  >
    <i18n-t
      keypath="features.dialog.tag_delete.note"
      tag="span"
    >
      <strong>"{{ tag.name }}"</strong>
    </i18n-t>
  </DialogAlert>
</template>

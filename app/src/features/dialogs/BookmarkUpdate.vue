<script setup lang="ts">
  import { computed } from 'vue'
  import { useTags } from '@/composables/api/tags'
  import { useBookmarkForm } from '@/composables/forms/bookmark'
  import { DialogForm } from '@shared/components/common/DialogForm'
  import { FormInputTags, FormInputText } from '@shared/components/common/Form'
  import type { Bookmark } from '@/models/bookmark'

  const props = defineProps<{
    bookmark: Bookmark
  }>()

  const open = defineModel<boolean>('open', { default: false })

  const { data: tags } = useTags()

  const tagOptions = computed(() => (tags.value ?? []).map((tag) => ({ value: tag.id, label: tag.name })))

  const { submit, isPending, error } = useBookmarkForm(props.bookmark, () => {
    open.value = false
  })
</script>

<template>
  <DialogForm
    v-model:open="open"
    :title="$t('features.dialog.bookmark_update.title')"
    :ok-label="$t('features.lbl.update')"
    :pending="isPending"
    :error="error"
    @submit="submit"
  >
    <FormInputText
      name="title"
      :label="$t('features.lbl.title')"
    />

    <FormInputText
      name="url"
      :label="$t('features.lbl.url')"
    />

    <FormInputText
      name="description"
      :label="$t('features.lbl.description')"
      optional
    />

    <FormInputTags
      name="tag_ids"
      :label="$t('features.lbl.tags')"
      :options="tagOptions"
      :placeholder="$t('features.ph.tags')"
      optional
    />
  </DialogForm>
</template>

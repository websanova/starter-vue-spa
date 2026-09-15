<script setup lang="ts">
  import { useBookmarkForm } from '@/composables/forms/bookmark'
  import { DialogForm } from '@shared/components/common/DialogForm'
  import { FormInputText } from '@shared/components/common/Form'

  const open = defineModel<boolean>('open', { default: false })

  const { submit, isPending, error } = useBookmarkForm(undefined, () => {
    open.value = false
  })
</script>

<template>
  <DialogForm
    v-model:open="open"
    :title="$t('features.dialog.bookmark_create.title')"
    :ok-label="$t('features.lbl.create')"
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
  </DialogForm>
</template>

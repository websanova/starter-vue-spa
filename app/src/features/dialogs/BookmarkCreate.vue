<script setup lang="ts">
  import { watch } from 'vue'
  import { useBookmarkForm } from '@/composables/forms/bookmark'
  import { DialogForm } from '@shared/components/common/DialogForm'
  import { FormInputText } from '@shared/components/common/Form'

  const open = defineModel<boolean>('open', { default: false })

  const { submit, isPending, error, reset } = useBookmarkForm(undefined, () => {
    open.value = false
  })

  /**
   * The dialog stays mounted while closed, so the form and mutation
   * would otherwise carry values and errors into the next open.
   */
  watch(open, (value) => {
    if (!value) {
      reset()
    }
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

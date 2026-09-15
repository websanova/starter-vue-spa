<script setup lang="ts">
  import { watch } from 'vue'
  import { useTagForm } from '@/composables/forms/tag'
  import { DialogForm } from '@shared/components/common/DialogForm'
  import { FormInputText } from '@shared/components/common/Form'

  const open = defineModel<boolean>('open', { default: false })

  const { submit, isPending, error, reset } = useTagForm(() => {
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
    :title="$t('features.dialog.tag_create.title')"
    :ok-label="$t('features.lbl.create')"
    :pending="isPending"
    :error="error"
    @submit="submit"
  >
    <FormInputText
      name="name"
      :label="$t('features.lbl.name')"
    />
  </DialogForm>
</template>

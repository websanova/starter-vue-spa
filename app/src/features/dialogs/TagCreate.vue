<script setup lang="ts">
  import { useTagForm } from '@/composables/forms/tag'
  import { DialogForm } from '@shared/components/common/DialogForm'
  import { FormInputText } from '@shared/components/common/Form'

  const open = defineModel<boolean>('open', { default: false })

  const { submit, isPending, error } = useTagForm(undefined, () => {
    open.value = false
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

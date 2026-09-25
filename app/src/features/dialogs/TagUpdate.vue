<script setup lang="ts">
  import { useTagForm } from '@/composables/forms/useTagForm'
  import { DialogForm } from '@shared/components/common/DialogForm'
  import { FormInputText } from '@shared/components/common/Form'
  import type { Tag } from '@/models/tag'

  const props = defineProps<{
    tag: Tag
  }>()

  const open = defineModel<boolean>('open', { default: false })

  const { submit, isPending, error } = useTagForm(props.tag, () => {
    open.value = false
  })
</script>

<template>
  <DialogForm
    v-model:open="open"
    :title="$t('features.dialog.tag_update.title')"
    :ok-label="$t('features.lbl.update')"
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

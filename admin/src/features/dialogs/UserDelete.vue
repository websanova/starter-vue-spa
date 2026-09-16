<script setup lang="ts">
  import { useUserDeleteForm } from '@/composables/forms/userDelete'
  import { DialogForm } from '@shared/components/common/DialogForm'
  import { FormInputText } from '@shared/components/common/Form'
  import type { User } from '@/models/user'

  const props = defineProps<{
    user: User
  }>()

  const open = defineModel<boolean>('open', { default: false })

  const { submit, isPending, error } = useUserDeleteForm(props.user, () => {
    open.value = false
  })
</script>

<template>
  <DialogForm
    v-model:open="open"
    color="destructive"
    :title="$t('features.dialog.user_delete.title')"
    :ok-label="$t('features.lbl.delete')"
    :pending="isPending"
    :error="error"
    @submit="submit"
  >
    <i18n-t
      keypath="features.dialog.user_delete.note"
      tag="p"
      class="text-sm text-muted-foreground"
    >
      <strong>"{{ user.firstName }} {{ user.lastName }} &lt;{{ user.email }}&gt;"</strong>
    </i18n-t>

    <FormInputText
      name="email"
      :label="$t('features.dialog.user_delete.confirm')"
    />
  </DialogForm>
</template>

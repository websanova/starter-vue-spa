<script setup lang="ts">
  import { useDeleteAuthTokenForm } from '@/composables/forms/authTokens'
  import { DialogAlert } from '@shared/components/common/DialogAlert'
  import type { AuthToken } from '@/models/authToken'

  const props = defineProps<{
    authToken: AuthToken
    userId: number
  }>()

  const open = defineModel<boolean>('open', { default: false })

  const { submit, isPending, error } = useDeleteAuthTokenForm(props.userId, props.authToken, () => {
    open.value = false
  })
</script>

<template>
  <DialogAlert
    v-model:open="open"
    color="destructive"
    :title="$t('features.dialog.auth_token_delete.title')"
    :ok-label="$t('features.lbl.delete')"
    :pending="isPending"
    :error="error"
    @ok="submit"
  >
    <i18n-t
      keypath="features.dialog.auth_token_delete.note"
      tag="span"
    >
      <strong>"{{ authToken.name }}"</strong>
    </i18n-t>
  </DialogAlert>
</template>

<script setup lang="ts">
  import { useDeleteOAuthTokenForm } from '@/composables/forms/oauthTokens'
  import { DialogAlert } from '@shared/components/common/DialogAlert'
  import type { OAuthToken } from '@/models/oauthToken'

  const props = defineProps<{
    oauthToken: OAuthToken
    userId: number
  }>()

  const open = defineModel<boolean>('open', { default: false })

  const { submit, isPending, error } = useDeleteOAuthTokenForm(props.userId, props.oauthToken, () => {
    open.value = false
  })
</script>

<template>
  <DialogAlert
    v-model:open="open"
    color="destructive"
    :title="$t('features.dialog.oauth_token_delete.title')"
    :ok-label="$t('features.lbl.delete')"
    :pending="isPending"
    :error="error"
    @ok="submit"
  >
    <i18n-t
      keypath="features.dialog.oauth_token_delete.note"
      tag="span"
    >
      <strong>"{{ oauthToken.clientName }}"</strong>
    </i18n-t>
  </DialogAlert>
</template>

<script setup lang="ts">
  import { useUserAuthTokens } from '@/composables/api/authTokens'
  import { useDialogService } from '@shared/composables/services/useDialogService'
  import AuthTokenItem from '@/components/items/AuthToken.vue'
  import { LoadList } from '@shared/components/common/LoadList'
  import { ItemGroup } from '@shared/components/ui/item'
  import type { User } from '@/models/user'

  const props = defineProps<{
    user: User
  }>()

  const dialog = useDialogService()

  const { data, isPending, error } = useUserAuthTokens(props.user.id)
</script>

<template>
  <LoadList
    i18n-key="features.load.nouns.auth_tokens"
    :error="error"
    :is-pending="isPending"
    :meta="data?.meta"
  >
    <ItemGroup>
      <AuthTokenItem
        v-for="authToken in data?.authTokens"
        :key="authToken.id"
        :auth-token="authToken"
        @delete="dialog.open('authTokenDelete', { userId: user.id, authToken })"
      />
    </ItemGroup>
  </LoadList>
</template>

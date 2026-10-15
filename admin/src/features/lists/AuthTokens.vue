<script setup lang="ts">
  import { useUserAuthTokens } from '@/composables/api/authTokens'
  import AuthTokenItem from '@/components/items/AuthToken.vue'
  import { LoadList } from '@shared/components/common/LoadList'
  import { ItemGroup } from '@shared/components/ui/item'
  import type { User } from '@/models/user'

  const props = defineProps<{
    user: User
  }>()

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
      />
    </ItemGroup>
  </LoadList>
</template>

<script setup lang="ts">
  import { useUserOAuthTokens } from '@/composables/api/oauthTokens'
  import OAuthTokenItem from '@/components/items/OAuthToken.vue'
  import { LoadList } from '@shared/components/common/LoadList'
  import { ItemGroup } from '@shared/components/ui/item'
  import type { User } from '@/models/user'

  const props = defineProps<{
    user: User
  }>()

  const { data, isPending, error } = useUserOAuthTokens(props.user.id)
</script>

<template>
  <LoadList
    i18n-key="features.load.nouns.oauth_tokens"
    :error="error"
    :is-pending="isPending"
    :meta="data?.meta"
  >
    <ItemGroup>
      <OAuthTokenItem
        v-for="oauthToken in data?.oauthTokens"
        :key="oauthToken.id"
        :oauth-token="oauthToken"
      />
    </ItemGroup>
  </LoadList>
</template>

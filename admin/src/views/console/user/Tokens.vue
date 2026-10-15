<script setup lang="ts">
  import AuthTokensList from '@/features/lists/AuthTokens.vue'
  import OAuthTokensList from '@/features/lists/OAuthTokens.vue'
  import type { User } from '@/models/user'

  defineProps<{
    user: User
  }>()
</script>

<template>
  <div class="space-y-8">
    <div>
      <h2 class="font-bold">
        {{ $t('features.lbl.auth_tokens') }}
      </h2>

      <AuthTokensList :user="user" />
    </div>

    <div>
      <h2 class="font-bold">
        {{ $t('features.lbl.oauth_tokens') }}
      </h2>

      <OAuthTokensList :user="user" />
    </div>
  </div>
</template>

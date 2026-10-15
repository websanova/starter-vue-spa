<script setup lang="ts">
  import AuthTokensList from '@/features/lists/AuthTokens.vue'
  import OAuthTokensList from '@/features/lists/OAuthTokens.vue'
  import { Stack } from '@shared/components/common/Stack'
  import { Subheading } from '@shared/components/common/Subheading'
  import type { User } from '@/models/user'

  defineProps<{
    user: User
  }>()
</script>

<template>
  <Stack>
    <section>
      <Subheading>
        {{ $t('features.lbl.auth_tokens') }}
      </Subheading>

      <AuthTokensList :user="user" />
    </section>

    <section>
      <Subheading>
        {{ $t('features.lbl.oauth_tokens') }}
      </Subheading>

      <OAuthTokensList :user="user" />
    </section>
  </Stack>
</template>

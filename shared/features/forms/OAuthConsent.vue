<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { useOAuthConsent } from '@shared/composables/api/oauth'
  import { Heading } from '@shared/components/common/Heading'
  import { Load } from '@shared/components/common/Load'

  const route = useRoute()

  const { data, isPending, error } = useOAuthConsent(route.query)
</script>

<template>
  <div class="flex w-full flex-col">
    <Heading
      class="text-center"
      :divider="false"
    >
      {{ $t('features.heading.title.oauth_authorize') }}
    </Heading>

    <Load
      center
      i18n-key="features.load.nouns.oauth"
      :error="error"
      :is-pending="isPending"
    >
      <p class="my-3 text-center">
        {{ $t('features.form.oauth_consent.note', { client: data?.clientName }) }}
      </p>

      <p class="text-center text-sm text-muted-foreground">
        {{ $t('features.form.oauth_consent.scope', { scope: data?.scope }) }}
      </p>
    </Load>
  </div>
</template>

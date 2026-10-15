<script setup lang="ts">
  import { watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useOAuthConsent } from '@shared/composables/api/oauth'
  import { useOAuthConsentForm } from '@shared/composables/forms/oauth'
  import { useAuthService } from '@shared/composables/services/useAuthService'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Form } from '@shared/components/common/Form'
  import { Heading } from '@shared/components/common/Heading'
  import { Inline } from '@shared/components/common/Inline'
  import { Load } from '@shared/components/common/Load'

  const route = useRoute()
  const router = useRouter()
  const auth = useAuthService()

  const { data, isPending, error } = useOAuthConsent(route.query)

  const { submit: onDecide, isPending: isDeciding, error: decisionError } = useOAuthConsentForm(route.query)

  // Replace so Back doesn't land on this page and bounce straight to login again.
  watch(data, (consent) => {
    if (consent && !auth.isLoggedIn.value) {
      router.replace({ name: 'auth-login', query: { redirect: route.fullPath } })
    }
  }, { immediate: true })
</script>

<template>
  <Form>
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
      <p class="text-center">
        {{ $t('features.form.oauth_consent.note', { client: data?.clientName }) }}
      </p>

      <p class="text-center text-sm text-muted-foreground">
        {{ $t('features.form.oauth_consent.scope', { scope: data?.scope }) }}
      </p>

      <p
        v-if="decisionError"
        class="text-center text-sm text-destructive"
      >
        {{ decisionError }}
      </p>

      <Inline class="justify-center">
        <ButtonLoading
          :pending="isDeciding"
          @click="onDecide(true)"
        >
          {{ $t('features.lbl.approve') }}
        </ButtonLoading>

        <ButtonLoading
          variant="outline"
          :pending="isDeciding"
          @click="onDecide(false)"
        >
          {{ $t('features.lbl.deny') }}
        </ButtonLoading>
      </Inline>
    </Load>
  </Form>
</template>

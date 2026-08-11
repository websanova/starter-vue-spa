<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { usePasswordResetForm } from '@/composables/forms/password'
  import { Form, FormButton, FormInputText } from '@shared/components/common/Form'

  const route = useRoute()

  const isValidLink = computed(() => Boolean(route.query.email && route.query.token))

  const { submit, isPending, isSuccess } = usePasswordResetForm({
    email: route.query.email as string,
    token: route.query.token as string,
  })
</script>

<template>
  <p
    v-if="!isValidLink"
    class="text-center"
  >
    {{ $t('features.form.auth_password_reset.note_invalid') }}
  </p>

  <i18n-t
    v-else-if="isSuccess"
    keypath="features.form.auth_password_reset.note_success"
    tag="p"
    class="text-center"
  >
    <RouterLink
      :to="{ name: 'auth-login' }"
      class="text-link"
    >
      {{ $t('features.lbl.sign_in') }}
    </RouterLink>
  </i18n-t>

  <Form
    v-else
    @submit="submit"
  >
    <FormInputText
      name="password"
      type="password"
      :label="$t('features.lbl.password')"
      :placeholder="$t('features.ph.password')"
    />

    <FormInputText
      name="password_confirmation"
      type="password"
      :label="$t('features.lbl.password_confirmation')"
      :placeholder="$t('features.ph.password_confirmation')"
    />

    <FormButton
      class="w-full"
      :pending="isPending"
    >
      {{ $t('features.lbl.update') }}
    </FormButton>
  </Form>
</template>

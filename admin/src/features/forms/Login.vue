<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useAuth } from '@shared/composables/api/auth'
  import { useFormMutation } from '@shared/composables/support/useFormMutation'
  import { AuthRules } from '@shared/rules/auth'
  import { Form, FormButton, FormInputText } from '@shared/components/common/Form'

  const { login } = useAuth()
  const router = useRouter()

  const { submit, isPending } = useFormMutation({
    rules: { email: AuthRules.email(), password: AuthRules.password() },
    onSubmit: login,
    onSuccess: () => router.push({ name: 'user-landing' }),
  })
</script>

<template>
  <Form @submit="submit">
    <FormInputText
      name="email"
      :label="$t('features.lbl.email')"
      :placeholder="$t('features.ph.email')"
      @keyup.enter="submit"
    />

    <FormInputText
      name="password"
      type="password"
      :label="$t('features.lbl.password')"
      :placeholder="$t('features.ph.password')"
      @keyup.enter="submit"
    />

    <FormButton
      class="w-full"
      :pending="isPending"
    >
      {{ $t('features.lbl.sign_in') }}
    </FormButton>
  </Form>
</template>

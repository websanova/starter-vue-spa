<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useRegisterForm } from '@/composables/forms/register'
  import { Form, FormButton, FormInputText } from '@shared/components/common/Form'

  const router = useRouter()

  const { submit, isPending } = useRegisterForm({
    onSuccess: () => router.push({ name: 'user-landing' }),
  })
</script>

<template>
  <Form @submit="submit">
    <FormInputText
      name="name"
      optional
      :label="$t('features.lbl.name')"
      :placeholder="$t('features.ph.name')"
    />

    <FormInputText
      name="email"
      :label="$t('features.lbl.email')"
      :placeholder="$t('features.ph.email')"
    />

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
      {{ $t('features.lbl.sign_up') }}
    </FormButton>

    <p class="self-end text-sm text-muted-foreground">
      {{ $t('features.form.register.prompt') }}

      <RouterLink
        :to="{ name: 'auth-login' }"
        class="text-link"
      >
        {{ $t('features.lbl.sign_in') }}
      </RouterLink>
    </p>
  </Form>
</template>

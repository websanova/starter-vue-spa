<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useLoginForm } from '@shared/composables/forms/login'
  import { Form, FormButton, FormInputText } from '@shared/components/common/Form'

  const router = useRouter()

  const { submit, isPending } = useLoginForm({
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

    <p class="self-end text-sm text-muted-foreground">
      {{ $t('features.form.login.prompt') }}

      <RouterLink
        :to="{ name: 'auth-register' }"
        class="text-primary underline underline-offset-4"
      >
        {{ $t('features.lbl.sign_up') }}
      </RouterLink>
    </p>
  </Form>
</template>

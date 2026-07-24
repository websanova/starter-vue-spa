<script setup lang="ts">
  import { usePasswordForgotForm } from '@/composables/forms/password'
  import { Form, FormButton, FormInputText } from '@shared/components/common/Form'

  const { submit, isPending, isSuccess } = usePasswordForgotForm()
</script>

<template>
  <p
    v-if="isSuccess"
    class="text-center"
  >
    {{ $t('features.form.password_forgot.note_success') }}
  </p>

  <Form
    v-else
    @submit="submit"
  >
    <FormInputText
      name="email"
      :label="$t('features.lbl.email')"
      :placeholder="$t('features.ph.email')"
      @keyup.enter="submit"
    />

    <FormButton
      class="w-full"
      :pending="isPending"
    >
      {{ $t('features.lbl.send_reset_code') }}
    </FormButton>

    <p class="self-end text-sm text-muted-foreground">
      <RouterLink
        :to="{ name: 'auth-login' }"
        class="text-link"
      >
        {{ $t('features.form.password_forgot.back') }}
      </RouterLink>
    </p>
  </Form>
</template>

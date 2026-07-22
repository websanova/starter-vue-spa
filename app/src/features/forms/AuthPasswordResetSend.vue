<script setup lang="ts">
  import { ref } from 'vue'
  import { usePasswordResetSendForm } from '@shared/composables/forms/passwordResetSend'
  import { Form, FormButton, FormInputText } from '@shared/components/common/Form'

  const submitted = ref(false)

  const { submit, isPending } = usePasswordResetSendForm({
    onSuccess: () => { submitted.value = true },
  })
</script>

<template>
  <div
    v-if="submitted"
    class="flex flex-col gap-2 text-center"
  >
    <p class="font-medium">
      {{ $t('features.form.password_reset_send.sent.heading') }}
    </p>

    <p class="text-sm text-muted-foreground">
      {{ $t('features.form.password_reset_send.sent.message') }}
    </p>
  </div>

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
      {{ $t('features.lbl.send_reset_link') }}
    </FormButton>

    <p class="self-end text-sm text-muted-foreground">
      {{ $t('features.form.password_reset_send.note_back') }}

      <RouterLink
        :to="{ name: 'auth-login' }"
        class="text-link"
      >
        {{ $t('features.lbl.sign_in') }}
      </RouterLink>
    </p>
  </Form>
</template>

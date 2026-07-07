<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useAuth } from '@shared/composables/support/auth'
  import { useFormMutation } from '@shared/composables/support/useFormMutation'
  import { AuthRules } from '@shared/rules/auth'
  import { FormInputText } from '@shared/components/common/FormInputText'
  import { Button } from '@shared/components/ui/button'

  const { login } = useAuth()
  const router = useRouter()

  const { submit, isPending } = useFormMutation({
    rules: { email: AuthRules.email(), password: AuthRules.password() },
    onSubmit: login,
    onSuccess: () => router.push({ name: 'user-landing' }),
  })
</script>

<template>
  <form
    class="flex w-full flex-col gap-4"
    @submit.prevent="submit"
  >
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

    <Button
      type="submit"
      class="w-full"
      :disabled="isPending"
    >
      {{ isPending ? $t('features.form.login.loading') : $t('features.lbl.sign_in') }}
    </Button>
  </form>
</template>

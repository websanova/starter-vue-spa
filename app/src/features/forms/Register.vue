<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useAuth } from '@shared/composables/support/auth'
  import { useFormMutation } from '@shared/composables/support/useFormMutation'
  import { AuthRules } from '@shared/rules/auth'
  import { FormInputText } from '@shared/components/common/FormInputText'
  import { Button } from '@shared/components/ui/button'

  const { register } = useAuth()
  const router = useRouter()

  const { submit, isPending } = useFormMutation({
    rules: {
      name: AuthRules.name(),
      email: AuthRules.email(),
      password: AuthRules.password(),
      password_confirmation: AuthRules.password(),
    },
    refine: AuthRules.passwordsMatch,
    onSubmit: (data) => register(data, { autoLogin: true }),
    onSuccess: () => router.push({ name: 'user-landing' }),
  })
</script>

<template>
  <form
    class="flex w-full flex-col gap-4"
    @submit.prevent="submit"
  >
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

    <Button
      type="submit"
      class="w-full"
      :disabled="isPending"
    >
      {{ isPending ? $t('features.form.register.loading') : $t('features.lbl.sign_up') }}
    </Button>

    <p class="self-end text-sm text-muted-foreground">
      {{ $t('features.form.register.prompt') }}

      <RouterLink
        :to="{ name: 'auth-login' }"
        class="text-primary underline underline-offset-4"
      >
        {{ $t('features.lbl.sign_in') }}
      </RouterLink>
    </p>
  </form>
</template>

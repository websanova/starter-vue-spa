<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useAuth } from '@shared/composables/support/auth'
  import { useFormMutation } from '@shared/composables/support/useFormMutation'
  import { AuthRules } from '@shared/rules/auth'
  import { Button } from '@shared/components/ui/button'
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/components/ui/form'
  import { Input } from '@shared/components/ui/input'

  const { login } = useAuth()
  const router = useRouter()

  const { submit, isPending } = useFormMutation({
    rules: { email: AuthRules.email(), password: AuthRules.password() },
    onSubmit: login,
    onSuccess: () => router.push({ name: 'user-landing' }),
  })
</script>

<template>
  <form class="flex w-full flex-col gap-4" @submit.prevent="submit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>{{ $t('features.lbl.email') }}</FormLabel>
        <FormControl>
          <Input type="email" :placeholder="$t('features.ph.email')" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>{{ $t('features.lbl.password') }}</FormLabel>
        <FormControl>
          <Input type="password" :placeholder="$t('features.ph.password')" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" class="w-full" :disabled="isPending">
      {{ isPending ? $t('features.form.login.loading') : $t('features.lbl.sign_in') }}
    </Button>

    <p class="self-end text-sm text-muted-foreground">
      {{ $t('features.form.login.prompt') }}
      <RouterLink :to="{ name: 'auth-register' }" class="text-primary underline underline-offset-4">
        {{ $t('features.lbl.sign_up') }}
      </RouterLink>
    </p>
  </form>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useAuth } from '@shared/composables/support/auth'
  import { useFormMutation } from '@shared/composables/support/useFormMutation'
  import { AuthRules } from '@shared/rules/auth'
  import { Button } from '@shared/components/ui/button'
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/components/ui/form'
  import { Input } from '@shared/components/ui/input'

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
  <form class="flex w-full flex-col gap-4" @submit.prevent="submit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>{{ $t('features.lbl.name') }}</FormLabel>
        <FormControl>
          <Input type="text" :placeholder="$t('features.ph.name')" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
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
    <FormField v-slot="{ componentField }" name="password_confirmation">
      <FormItem>
        <FormLabel>{{ $t('features.lbl.password_confirmation') }}</FormLabel>
        <FormControl>
          <Input type="password" :placeholder="$t('features.ph.password_confirmation')" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="w-full" :disabled="isPending">
      {{ isPending ? $t('features.form.register.loading') : $t('features.lbl.sign_up') }}
    </Button>
    <p class="self-end text-sm text-muted-foreground">
      {{ $t('features.form.register.prompt') }}
      <RouterLink :to="{ name: 'auth-login' }" class="text-primary underline underline-offset-4">
        {{ $t('features.lbl.sign_in') }}
      </RouterLink>
    </p>
  </form>
</template>

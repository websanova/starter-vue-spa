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
    refine: (schema) => schema.refine((data) => data.password === data.password_confirmation, {
      message: 'Passwords do not match.',
      path: ['password_confirmation'],
    }),
    onSubmit: (data) => register(data, { autoLogin: true }),
    onSuccess: () => router.push({ name: 'user-landing' }),
  })
</script>

<template>
  <form class="flex w-full flex-col gap-4" @submit.prevent="submit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Your name" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="you@example.com" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="password" placeholder="Password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password_confirmation">
      <FormItem>
        <FormLabel>Confirm Password</FormLabel>
        <FormControl>
          <Input type="password" placeholder="Confirm password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="w-full" :disabled="isPending">
      {{ isPending ? 'Signing up...' : 'Sign up' }}
    </Button>
    <p class="self-end text-sm text-muted-foreground">
      Already a member?
      <RouterLink :to="{ name: 'auth-login' }" class="text-primary underline underline-offset-4">
        Login
      </RouterLink>
    </p>
  </form>
</template>

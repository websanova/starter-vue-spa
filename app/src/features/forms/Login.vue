<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useAuth } from '@shared/composables/support/auth'
  import { useFormMutation } from '@shared/composables/support/useFormMutation'
  import { AuthRules } from '@shared/rules/auth'
  import { Button } from '@shared/components/ui/button'
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/components/ui/form'
  import { Input } from '@shared/components/ui/input'

  const router = useRouter()
  const { login } = useAuth()

  const form = useFormMutation({
    rules: { email: AuthRules.email(), password: AuthRules.password() },
    onSubmit: login,
  })

  async function onSubmit() {
    await form.submit()
    router.push({ name: 'user-landing' })
  }
</script>

<template>
  <form class="flex w-full flex-col gap-4" @submit.prevent="onSubmit">
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
    <Button type="submit" class="w-full" :disabled="form.isPending">
      {{ form.isPending ? 'Signing in...' : 'Sign in' }}
    </Button>
  </form>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'
  import { z } from 'zod'
  import { useMutation } from '@tanstack/vue-query'
  import { useAuth } from '@shared/composables/support/auth'
  import { HttpError } from '@shared/plugins/http/client'
  import type { LoginData } from '@shared/composables/support/auth'
  import { Button } from '@shared/components/ui/button'
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/components/ui/form'
  import { Input } from '@shared/components/ui/input'

  const schema = z.object({
    email: z.string().min(1, 'Email is required.').email('Enter a valid email.'),
    password: z.string().min(1, 'Password is required.'),
  })

  const router = useRouter()
  const { login } = useAuth()

  const { handleSubmit, setErrors } = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues: { email: '', password: '' },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (values: LoginData) => login(values),
    onSuccess: () => router.push({ name: 'user-landing' }),
    onError: (err) => {
      if (err instanceof HttpError && err.response.status === 422) {
        const body = err.response.data as { errors: Record<string, string[]> }
        setErrors(Object.fromEntries(
          Object.entries(body.errors).map(([field, msgs]) => [field, msgs])
        ))
      }
    },
  })

  const onSubmit = handleSubmit((values) => mutate(values))
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
    <Button type="submit" class="w-full" :disabled="isPending">
      {{ isPending ? 'Signing in...' : 'Sign in' }}
    </Button>
  </form>
</template>

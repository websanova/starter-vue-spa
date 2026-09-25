<script setup lang="ts">
  import { useUserUpdateForm } from '@/composables/forms/useUserUpdateForm'
  import { Form, FormButton, FormInputText } from '@shared/components/common/Form'
  import type { User } from '@/models/user'

  const props = defineProps<{
    user: User
  }>()

  const { submit, isPending } = useUserUpdateForm(props.user)
</script>

<template>
  <Form @submit="submit">
    <FormInputText
      name="first_name"
      :label="$t('features.lbl.first_name')"
      :placeholder="$t('features.ph.first_name')"
    />

    <FormInputText
      name="last_name"
      :label="$t('features.lbl.last_name')"
      :placeholder="$t('features.ph.last_name')"
    />

    <FormButton :pending="isPending">
      {{ $t('features.lbl.update') }}
    </FormButton>
  </Form>
</template>

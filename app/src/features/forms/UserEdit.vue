<script setup lang="ts">
  import { useAuth } from '@shared/composables/support/auth'
  import { useFormMutation } from '@shared/composables/support/useFormMutation'
  import { UserRules } from '@shared/rules/user'
  import { Form } from '@shared/components/common/Form'
  import { FormInputText } from '@shared/components/common/FormInputText'
  import { Button } from '@shared/components/ui/button'

  const { user, updateProfile } = useAuth()

  const { submit, isPending } = useFormMutation({
    rules: {
      first_name: UserRules.firstName(),
      last_name: UserRules.lastName(),
    },
    fields: {
      first_name: user.value?.firstName,
      last_name: user.value?.lastName,
    },
    onSubmit: updateProfile,
  })
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

    <Button
      type="submit"
      class="self-start"
      :disabled="isPending"
    >
      {{ isPending ? $t('features.form.profile.loading') : $t('features.lbl.update') }}
    </Button>
  </Form>
</template>

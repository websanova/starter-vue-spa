<script setup lang="ts">
  import { useAuth } from '@shared/composables/api/auth'
  import { useFormMutation } from '@shared/composables/support/useFormMutation'
  import { useI18n } from '@shared/plugins/i18n'
  import { UserRules } from '@shared/rules/user'
  import { Form, FormButton, FormInputText } from '@shared/components/common/Form'
  import { toast } from '@shared/components/ui/sonner'

  const i18n = useI18n()
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
    onSuccess: () => toast.success(i18n.t('features.form.profile.toast')),
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

    <FormButton :pending="isPending">
      {{ $t('features.lbl.update') }}
    </FormButton>
  </Form>
</template>

<script setup lang="ts">
  import { useBillingAddressForm } from '@/composables/forms/billing'
  import { Form, FormButton, FormInputText } from '@shared/components/common/Form'

  defineProps<{
    submitLabel: string
    pending?: boolean
  }>()

  const emit = defineEmits<{
    success: []
  }>()

  const { submit, isPending, error } = useBillingAddressForm({
    onSuccess: () => emit('success'),
  })
</script>

<template>
  <Form @submit="submit">
    <p
      v-if="error"
      class="text-center text-destructive"
    >
      {{ error }}
    </p>

    <FormInputText
      name="line1"
      :label="$t('features.lbl.line1')"
      :placeholder="$t('features.ph.line1')"
    />

    <FormInputText
      name="line2"
      optional
      :label="$t('features.lbl.line2')"
      :placeholder="$t('features.ph.line2')"
    />

    <FormInputText
      name="city"
      :label="$t('features.lbl.city')"
      :placeholder="$t('features.ph.city')"
    />

    <FormInputText
      name="postal_code"
      :label="$t('features.lbl.postal_code')"
      :placeholder="$t('features.ph.postal_code')"
    />

    <FormInputText
      name="country"
      :label="$t('features.lbl.country')"
      :placeholder="$t('features.ph.country')"
    />

    <FormButton
      class="w-full"
      :pending="isPending || pending"
    >
      {{ submitLabel }}
    </FormButton>
  </Form>
</template>

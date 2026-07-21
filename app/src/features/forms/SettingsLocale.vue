<script setup lang="ts">
  import { useLocaleOptions } from '@shared/composables/support/useLocaleOptions'
  import { useTimezoneOptions } from '@shared/composables/support/useTimezoneOptions'
  import { useSettingsLocaleForm } from '@/composables/forms/settings'
  import { Form, FormButton, FormInputSelect } from '@shared/components/common/Form'

  const { submit, isPending } = useSettingsLocaleForm()
  const languages = useLocaleOptions()
  const timezones = useTimezoneOptions()
</script>

<template>
  <Form @submit="submit">
    <FormInputSelect
      v-if="languages.length > 1"
      name="locale"
      :label="$t('features.lbl.language')"
      :placeholder="$t('features.ph.language')"
      :options="languages"
    />

    <FormInputSelect
      name="timezone"
      :label="$t('features.lbl.timezone')"
      :placeholder="$t('features.ph.timezone')"
      :options="timezones"
    />

    <FormButton :pending="isPending">
      {{ $t('features.lbl.update') }}
    </FormButton>
  </Form>
</template>

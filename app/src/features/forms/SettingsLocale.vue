<script setup lang="ts">
  import { useLocaleOptions } from '@shared/composables/support/useLocaleOptions'
  import { useI18n } from '@shared/plugins/i18n'
  import { useSettingsLocaleForm } from '@/composables/forms/settings'
  import { Form, FormButton, FormInputSelect } from '@shared/components/common/Form'

  const i18n = useI18n()
  const { submit, isPending } = useSettingsLocaleForm()
  const languages = useLocaleOptions()

  const timezones = [
    { value: 'America/New_York', label: i18n.t('features.tz.new_york') },
    { value: 'America/Chicago', label: i18n.t('features.tz.chicago') },
    { value: 'America/Denver', label: i18n.t('features.tz.denver') },
    { value: 'America/Los_Angeles', label: i18n.t('features.tz.los_angeles') },
    { value: 'Europe/London', label: i18n.t('features.tz.london') },
  ]
</script>

<template>
  <Form @submit="submit">
    <FormInputSelect
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

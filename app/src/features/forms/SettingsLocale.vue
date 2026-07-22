<script setup lang="ts">
  import { computed, onUnmounted, ref } from 'vue'
  import { useDateTime } from '@shared/composables/support/useDateTime'
  import { useLocaleOptions } from '@shared/composables/support/useLocaleOptions'
  import { useTimezoneOptions } from '@shared/composables/support/useTimezoneOptions'
  import { useSettingsLocaleForm } from '@/composables/forms/settings'
  import { Form, FormButton, FormInputSelect } from '@shared/components/common/Form'

  const { submit, isPending } = useSettingsLocaleForm()
  const formatDate = useDateTime()
  const languages = useLocaleOptions()
  const timezones = useTimezoneOptions()

  const now = ref(new Date())
  const timer = setInterval(() => (now.value = new Date()), 1000)
  onUnmounted(() => clearInterval(timer))

  const localTime = computed(() => formatDate(now.value, 'long'))
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

    <p class="text-sm text-muted-foreground">
      {{ $t('features.lbl.local_time') }}: {{ localTime }}
    </p>

    <FormButton :pending="isPending">
      {{ $t('features.lbl.update') }}
    </FormButton>
  </Form>
</template>

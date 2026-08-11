<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
  import SettingsLocaleForm from '@/features/forms/SettingsLocale.vue'
  import SettingsThemeForm from '@/features/forms/SettingsTheme.vue'
</script>

<template>
  <Stack>
    <section>
      <Heading>
        {{ $t('features.heading.settings_appearance') }}
      </Heading>

      <SettingsThemeForm />
    </section>

    <section>
      <Heading>
        {{ $t('features.heading.settings_locale') }}
      </Heading>

      <SettingsLocaleForm />
    </section>
  </Stack>
</template>

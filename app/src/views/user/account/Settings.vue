<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
  import AppearanceTheme from '@/features/appearance/Theme.vue'
  import SettingsLocaleForm from '@/features/forms/SettingsLocale.vue'
</script>

<template>
  <Stack>
    <section>
      <Heading>
        {{ $t('features.headings.settings_locale') }}
      </Heading>

      <SettingsLocaleForm />
    </section>

    <section>
      <Heading>
        {{ $t('features.headings.settings_appearance') }}
      </Heading>

      <AppearanceTheme />
    </section>
  </Stack>
</template>

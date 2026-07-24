<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import { Stack } from '@shared/components/common/Stack'
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
  </Stack>
</template>

<script setup lang="ts">
  import { GlobeIcon } from '@lucide/vue'
  import { useI18nService } from '@shared/composables/services/i18n'
  import { useLocaleOptions } from '@shared/composables/support/useLocaleOptions'
  import { useI18n } from '@shared/plugins/i18n'
  import { Navbar, NavDropdown } from '@shared/components/common/Navbar'
  import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@shared/components/ui/dropdown-menu'
  import DarkModeToggle from '@shared/features/toggles/DarkMode.vue'
  import type { Locale } from '@shared/plugins/i18n'

  const i18n = useI18n()
  const { switchLocale } = useI18nService()
  const locales = useLocaleOptions()
</script>

<template>
  <Navbar>
    <NavDropdown
      v-if="locales.length > 1"
      align="end"
    >
      <template #trigger>
        <GlobeIcon />
      </template>

      <DropdownMenuRadioGroup
        :model-value="i18n.locale.value"
        @update:model-value="switchLocale($event as Locale)"
      >
        <DropdownMenuRadioItem
          v-for="option in locales"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </NavDropdown>

    <DarkModeToggle class="size-7" />
  </Navbar>
</template>

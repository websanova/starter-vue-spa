<script setup lang="ts">
  import { GlobeIcon } from '@lucide/vue'
  import { useI18nService } from '@shared/composables/services/i18n'
  import { useLocaleOptions } from '@shared/composables/support/useLocaleOptions'
  import { Navbar, NavDropdown } from '@shared/components/common/Navbar'
  import { DropdownMenuItem } from '@shared/components/ui/dropdown-menu'
  import DarkModeToggle from '@shared/features/toggles/DarkMode.vue'
  import type { Locale } from '@shared/plugins/i18n'

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

      <DropdownMenuItem
        v-for="option in locales"
        :key="option.value"
        @select="switchLocale(option.value as Locale)"
      >
        {{ option.label }}
      </DropdownMenuItem>
    </NavDropdown>

    <DarkModeToggle class="size-7" />
  </Navbar>
</template>

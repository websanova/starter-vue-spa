<script setup lang="ts">
  import { LogOutIcon, MoonIcon, SunIcon } from '@lucide/vue'
  import { useDarkMode } from '@shared/composables/support/darkMode'
  import { useLogout } from '@shared/composables/support/logout'
  import { SheetMenu } from '@shared/components/common/SheetMenu'
  import { Button } from '@shared/components/ui/button'

  withDefaults(defineProps<{
    side?: 'left' | 'right'
    width?: string
    headerHeight?: string
  }>(), {
    side: 'left',
  })

  const { isDark, toggle } = useDarkMode()
  const onLogout = useLogout()
  const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <SheetMenu
    v-model:open="open"
    :title="$t('features.sr.menu_account')"
    :side="side"
    :width="width"
    :header-height="headerHeight"
  >
    <slot />

    <template #footer>
      <Button
        severity="danger"
        size="sm"
        @click="onLogout"
      >
        <LogOutIcon />
        {{ $t('features.lbl.sign_out') }}
      </Button>

      <span
        class="ms-auto"
        @click="toggle"
      >
        <SunIcon
          v-if="isDark"
          class="h-8 w-8"
        />

        <MoonIcon
          v-else
          class="h-8 w-8"
        />

        <span class="sr-only">
          {{ $t('features.sr.dark_mode_toggle') }}
        </span>
      </span>
    </template>
  </SheetMenu>
</template>

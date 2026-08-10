<script setup lang="ts">
  import { LogOutIcon } from '@lucide/vue'
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
        size="sm"
        @click="onLogout"
      >
        <LogOutIcon />
        {{ $t('features.lbl.sign_out') }}
      </Button>

      <slot name="footer" />
    </template>
  </SheetMenu>
</template>

<script setup lang="ts">
  import { LogOutIcon, MoonIcon } from '@lucide/vue'
  import { SheetMenu } from '@shared/components/common/SheetMenu'
  import { Button } from '@shared/components/ui/button'

  withDefaults(defineProps<{
    side?: 'left' | 'right'
    width?: string
    headerHeight?: string
  }>(), {
    side: 'left',
  })

  defineEmits<{
    logout: []
    'toggle-dark-mode': []
  }>()

  const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <SheetMenu
    v-model:open="open"
    :side="side"
    :width="width"
    :header-height="headerHeight"
  >
    <slot />

    <template #footer>
      <Button
        severity="danger"
        size="sm"
        @click="$emit('logout')"
      >
        <LogOutIcon />
        {{ $t('features.lbl.sign_out') }}
      </Button>

      <span
        class="ms-auto"
        @click="$emit('toggle-dark-mode')"
      >
        <MoonIcon class="h-8 w-8" />
        <span class="sr-only">Toggle dark mode</span>
      </span>
    </template>
  </SheetMenu>
</template>

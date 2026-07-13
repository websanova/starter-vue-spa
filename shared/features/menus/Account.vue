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
        variant="ghost"
        @click="$emit('logout')"
      >
        <LogOutIcon />
        Logout
      </Button>

      <Button
        variant="ghost"
        size="icon"
        class="ms-auto"
        @click="$emit('toggle-dark-mode')"
      >
        <MoonIcon />
        <span class="sr-only">Toggle dark mode</span>
      </Button>
    </template>
  </SheetMenu>
</template>

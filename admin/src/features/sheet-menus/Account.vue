<script setup lang="ts">
  import AccountSheetMenu from '@shared/features/sheet-menus/Account.vue'
  import DarkModeToggle from '@shared/features/toggles/DarkMode.vue'

  withDefaults(defineProps<{
    side?: 'left' | 'right'
    width?: string
    headerHeight?: string
  }>(), {
    side: 'left',
  })

  const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <AccountSheetMenu
    v-model:open="open"
    :side="side"
    :width="width"
    :header-height="headerHeight"
  >
    <slot />

    <template #footer>
      <DarkModeToggle class="ms-auto size-8" />
    </template>
  </AccountSheetMenu>
</template>

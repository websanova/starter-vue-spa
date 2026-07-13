<script setup lang="ts">
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
    'mark-all-read': []
  }>()

  const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <SheetMenu
    v-model:open="open"
    :title="$t('features.sr.menu_notifications')"
    :side="side"
    :width="width"
    :header-height="headerHeight"
  >
    <slot />

    <template #footer>
      <Button
        severity="danger"
        size="sm"
        @click="$emit('mark-all-read')"
      >
        {{ $t('features.lbl.mark_all_read') }}
      </Button>
    </template>
  </SheetMenu>
</template>

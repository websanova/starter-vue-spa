<script setup lang="ts">
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { SheetMenu } from '@shared/components/common/SheetMenu'

  withDefaults(defineProps<{
    side?: 'left' | 'right'
    width?: string
    headerHeight?: string
    pending?: boolean
    disabled?: boolean
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
      <ButtonLoading
        severity="danger"
        size="sm"
        :pending="pending"
        :disabled="disabled"
        @click="$emit('mark-all-read')"
      >
        {{ $t('features.lbl.mark_all_read') }}
      </ButtonLoading>
    </template>
  </SheetMenu>
</template>

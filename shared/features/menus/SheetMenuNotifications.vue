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
    :side="side"
    :width="width"
    :header-height="headerHeight"
  >
    <slot />

    <template #footer>
      <Button
        variant="link"
        class="ms-auto"
        @click="$emit('mark-all-read')"
      >
        Mark all read
      </Button>
    </template>
  </SheetMenu>
</template>

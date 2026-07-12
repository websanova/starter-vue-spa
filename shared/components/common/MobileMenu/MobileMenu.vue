<script setup lang="ts">
  import { Sheet, SheetContent, SheetTitle } from '@shared/components/ui/sheet'

  withDefaults(defineProps<{
    side?: 'left' | 'right'
    width?: string
  }>(), {
    side: 'left',
    width: '260px',
  })

  const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <Sheet v-model:open="open">
    <SheetContent
      :side="side"
      :style="{ width, maxWidth: width }"
    >
      <SheetTitle class="sr-only">Menu</SheetTitle>
      <slot />
    </SheetContent>
  </Sheet>
</template>

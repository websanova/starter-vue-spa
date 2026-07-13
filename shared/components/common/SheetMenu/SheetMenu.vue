<script setup lang="ts">
  import { XIcon } from '@lucide/vue'
  import StarterTextLogo from '@shared/components/logos/StarterText.vue'
  import { Sheet, SheetClose, SheetContent, SheetTitle } from '@shared/components/ui/sheet'

  withDefaults(defineProps<{
    side?: 'left' | 'right'
    width?: string
    headerHeight?: string
  }>(), {
    side: 'left',
    width: '260px',
    headerHeight: '0px',
  })

  const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <Sheet v-model:open="open">
    <SheetContent
      :side="side"
      :style="{ width, maxWidth: width }"
      :aria-describedby="undefined"
      class="p-0 gap-0"
    >
      <!--
        Accessible name for the dialog, required by reka-ui and read out by
        screen readers on open. Visually hidden since the header already shows
        the logo. No description: the title alone describes a nav menu, and
        aria-describedby is opted out above to silence the missing-description
        warning.
      -->
      <SheetTitle class="sr-only">Main Menu</SheetTitle>

      <header
        class="shrink-0 flex items-center justify-between px-3 bg-background shadow-sm"
        :style="{ height: headerHeight }"
      >
        <StarterTextLogo class="h-6" />

        <SheetClose class="cursor-pointer opacity-70 transition-opacity hover:opacity-100">
          <XIcon class="size-5" />
          <span class="sr-only">Close</span>
        </SheetClose>
      </header>

      <div class="flex-1 min-h-0 overflow-y-auto">
        <slot />
      </div>

      <footer
        v-if="$slots.footer"
        class="shrink-0 flex items-center px-3 border-t"
        :style="{ minHeight: headerHeight }"
      >
        <slot name="footer" />
      </footer>
    </SheetContent>
  </Sheet>
</template>

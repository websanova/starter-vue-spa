<script setup lang="ts">
  import { EllipsisVerticalIcon } from '@lucide/vue'
  import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@shared/components/ui/dropdown-menu'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button
        type="button"
        class="flex size-6 cursor-pointer items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground [&_svg]:size-4"
      >
        <EllipsisVerticalIcon />
        <span class="sr-only">{{ $t('features.sr.actions') }}</span>
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <slot />
    </DropdownMenuContent>
  </DropdownMenu>
</template>

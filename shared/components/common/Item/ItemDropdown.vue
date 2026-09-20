<script setup lang="ts">
  import { EllipsisVerticalIcon } from '@lucide/vue'
  import { Button } from '@shared/components/ui/button'
  import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@shared/components/ui/dropdown-menu'
</script>

<template>
  <DropdownMenu :modal="false">
    <DropdownMenuTrigger as-child>
      <Button
        type="button"
        size="icon"
        variant="ghost"
      >
        <EllipsisVerticalIcon />
        <span class="sr-only">{{ $t('features.sr.actions') }}</span>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <slot />
    </DropdownMenuContent>
  </DropdownMenu>
</template>

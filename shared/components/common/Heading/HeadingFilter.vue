<script setup lang="ts">
  import { ListFilterIcon } from '@lucide/vue'
  import { Button } from '@shared/components/ui/button'
  import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@shared/components/ui/dropdown-menu'

  defineProps<{
    options: { value: string, label: string }[]
  }>()

  const model = defineModel<string>({ default: '' })
</script>

<template>
  <DropdownMenu :modal="false">
    <DropdownMenuTrigger as-child>
      <Button
        size="icon"
        :variant="model ? 'solid' : 'outline'"
      >
        <ListFilterIcon />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <DropdownMenuRadioGroup v-model="model">
        <DropdownMenuRadioItem
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

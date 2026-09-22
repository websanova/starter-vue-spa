<script setup lang="ts">
  import type { Component } from 'vue'
  import { ArrowDownWideNarrowIcon, ArrowUpDownIcon, ArrowUpNarrowWideIcon } from '@lucide/vue'
  import { Button } from '@shared/components/ui/button'
  import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@shared/components/ui/dropdown-menu'

  defineProps<{
    fields: { value: string, label: string, icon: Component }[]
  }>()

  const sortBy = defineModel<string>('sortBy')
  const sortDir = defineModel<string>('sortDir')
</script>

<template>
  <DropdownMenu :modal="false">
    <DropdownMenuTrigger as-child>
      <Button
        size="icon"
        variant="outline"
      >
        <ArrowUpDownIcon />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <DropdownMenuRadioGroup v-model="sortBy">
        <DropdownMenuRadioItem
          v-for="field in fields"
          :key="field.value"
          :value="field.value"
        >
          <component :is="field.icon" />
          {{ field.label }}
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>

      <DropdownMenuSeparator />

      <DropdownMenuRadioGroup v-model="sortDir">
        <DropdownMenuRadioItem value="asc">
          <ArrowUpNarrowWideIcon />
          Ascending
        </DropdownMenuRadioItem>

        <DropdownMenuRadioItem value="desc">
          <ArrowDownWideNarrowIcon />
          Descending
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

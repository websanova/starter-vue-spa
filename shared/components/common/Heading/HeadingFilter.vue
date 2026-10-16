<script setup lang="ts">
  import { computed } from 'vue'
  import { ListFilterIcon } from '@lucide/vue'
  import { Indicator } from '@shared/components/common/Indicator'
  import { Button } from '@shared/components/ui/button'
  import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@shared/components/ui/dropdown-menu'

  defineProps<{
    groups: { name: string, options: { value: string, label: string }[] }[]
  }>()

  const model = defineModel<Record<string, string | undefined>>({ default: () => ({}) })

  const count = computed(() => Object.values(model.value).filter(Boolean).length)

  function onSelect(name: string, value: unknown) {
    model.value = { ...model.value, [name]: String(value) }
  }
</script>

<template>
  <Indicator :show="count > 0">
    <DropdownMenu :modal="false">
      <DropdownMenuTrigger as-child>
        <Button
          size="icon"
          variant="outline"
        >
          <ListFilterIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <template
          v-for="(group, index) in groups"
          :key="group.name"
        >
          <DropdownMenuSeparator v-if="index" />

          <DropdownMenuRadioGroup
            :model-value="model[group.name] ?? ''"
            @update:model-value="onSelect(group.name, $event)"
          >
            <DropdownMenuRadioItem
              v-for="option in group.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </template>
      </DropdownMenuContent>
    </DropdownMenu>
  </Indicator>
</template>

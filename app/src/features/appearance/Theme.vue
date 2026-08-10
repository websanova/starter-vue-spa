<script setup lang="ts">
  import { MonitorIcon, MoonIcon, SunIcon } from '@lucide/vue'
  import { useDarkMode } from '@shared/composables/support/darkMode'
  import { Form } from '@shared/components/common/Form'
  import { Label } from '@shared/components/ui/label'
  import { ToggleGroup, ToggleGroupItem } from '@shared/components/ui/toggle-group'

  const { mode, set } = useDarkMode()
</script>

<template>
  <Form>
    <div class="flex items-center justify-between gap-4">
      <Label>
        {{ $t('features.lbl.theme') }}
      </Label>

      <ToggleGroup
        type="single"
        variant="outline"
        :model-value="mode"
        @update:model-value="set"
      >
        <ToggleGroupItem
          value="light"
          class="cursor-pointer"
        >
          <SunIcon />
          {{ $t('features.lbl.light') }}
        </ToggleGroupItem>

        <ToggleGroupItem
          value="dark"
          class="cursor-pointer"
        >
          <MoonIcon />
          {{ $t('features.lbl.dark') }}
        </ToggleGroupItem>

        <ToggleGroupItem
          value="auto"
          class="cursor-pointer"
        >
          <MonitorIcon />
          {{ $t('features.lbl.system') }}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  </Form>
</template>

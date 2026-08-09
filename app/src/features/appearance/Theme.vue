<script setup lang="ts">
  import { ref } from 'vue'
  import { MonitorIcon, MoonIcon, SunIcon } from '@lucide/vue'
  import { Form } from '@shared/components/common/Form'
  import { Label } from '@shared/components/ui/label'
  import { ToggleGroup, ToggleGroupItem } from '@shared/components/ui/toggle-group'

  const theme = ref('system')

  /**
   * Reka clears the value when the active item is clicked a second
   * time. Dropping the empty update keeps one theme selected at all
   * times.
   */
  function onUpdate(value: unknown) {
    if (typeof value === 'string') {
      theme.value = value
    }
  }
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
        :model-value="theme"
        @update:model-value="onUpdate"
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
          value="system"
          class="cursor-pointer"
        >
          <MonitorIcon />
          {{ $t('features.lbl.system') }}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  </Form>
</template>

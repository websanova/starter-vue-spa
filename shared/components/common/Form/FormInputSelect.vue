<script setup lang="ts">
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form"
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select"

  const props = withDefaults(defineProps<{
    name: string
    label: string
    options: { value: string; label: string }[]
    placeholder?: string
    optional?: boolean
  }>(), {
    optional: false,
  })

  /**
   * Resolves the trigger label from the current options rather than
   * letting reka-ui display its own. reka reads the selected item's
   * text once when it is picked and does not update it if that
   * option's label later changes to a new string. Reading from props
   * keeps the displayed value in sync with the options.
   */
  function labelFor(value: unknown) {
    return props.options.find((o) => o.value === value)?.label
  }
</script>

<template>
  <FormField
    v-slot="{ componentField }"
    :name="props.name"
  >
    <FormItem>
      <FormLabel>
        {{ props.label }}

        <span
          v-if="props.optional"
          class="lowercase text-muted-foreground -ml-1"
        >
          ({{ $t('features.lbl.optional') }})
        </span>
      </FormLabel>

      <Select v-bind="componentField">
        <FormControl>
          <SelectTrigger>
            <SelectValue :placeholder="props.placeholder">
              {{ labelFor(componentField.modelValue) }}
            </SelectValue>
          </SelectTrigger>
        </FormControl>

        <SelectContent>
          <SelectItem
            v-for="option in props.options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </SelectItem>
        </SelectContent>
      </Select>

      <FormMessage />
    </FormItem>
  </FormField>
</template>

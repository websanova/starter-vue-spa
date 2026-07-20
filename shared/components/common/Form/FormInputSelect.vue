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
            <SelectValue :placeholder="props.placeholder" />
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

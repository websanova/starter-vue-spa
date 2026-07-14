<script setup lang="ts">
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form"
  import { Input } from "@shared/components/ui/input"

  const props = withDefaults(defineProps<{
    name: string
    label: string
    placeholder?: string
    type?: string
    optional?: boolean
  }>(), {
    type: "text",
    optional: false
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

      <FormControl>
        <Input
          :type="props.type"
          :placeholder="props.placeholder"
          v-bind="componentField"
        />
      </FormControl>

      <FormMessage />
    </FormItem>
  </FormField>
</template>

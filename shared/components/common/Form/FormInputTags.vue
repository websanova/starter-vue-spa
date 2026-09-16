<script setup lang="ts">
  import { ChevronsUpDownIcon } from "@lucide/vue"
  import { ComboboxInput } from "reka-ui"
  import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxItem, ComboboxList, ComboboxTrigger } from "@shared/components/ui/combobox"
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form"
  import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from "@shared/components/ui/tags-input"

  interface Option {
    value: number
    label: string
  }

  const props = withDefaults(defineProps<{
    name: string
    label: string
    options: Option[]
    placeholder?: string
    optional?: boolean
  }>(), {
    optional: false,
  })

  /**
   * The field holds ids while the tags input and the combobox both work
   * on option objects, so the value is mapped on the way in and out.
   */
  function selected(value: unknown) {
    const ids = (value ?? []) as number[]

    return props.options.filter((option) => ids.includes(option.value))
  }

  function toIds(options: unknown) {
    return (options as Option[]).map((option) => option.value)
  }
</script>

<template>
  <FormField
    v-slot="{ value, handleChange }"
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

      <Combobox
        multiple
        open-on-focus
        :model-value="selected(value)"
        @update:model-value="(options) => handleChange(toIds(options))"
      >
        <ComboboxAnchor as-child>
          <FormControl>
            <TagsInput
              class="w-full"
              :model-value="selected(value)"
              :display-value="(option) => (option as Option).label"
              @update:model-value="(options) => handleChange(toIds(options))"
            >
              <TagsInputItem
                v-for="option in selected(value)"
                :key="option.value"
                :value="option"
              >
                <TagsInputItemText />
                <TagsInputItemDelete />
              </TagsInputItem>

              <ComboboxInput as-child>
                <TagsInputInput
                  class="w-auto min-w-24"
                  :placeholder="props.placeholder"
                  @keydown.enter.prevent
                />
              </ComboboxInput>

              <ComboboxTrigger class="ml-auto cursor-pointer">
                <ChevronsUpDownIcon class="size-4 opacity-50" />
              </ComboboxTrigger>
            </TagsInput>
          </FormControl>
        </ComboboxAnchor>

        <ComboboxList class="w-(--reka-combobox-trigger-width)">
          <ComboboxEmpty>
            {{ $t('features.lbl.no_results') }}
          </ComboboxEmpty>

          <ComboboxGroup>
            <ComboboxItem
              v-for="option in props.options"
              :key="option.value"
              :value="option"
            >
              {{ option.label }}
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </Combobox>

      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from "vue"
  import { reactiveOmit } from "@vueuse/core"
  import { SelectLabel, type SelectLabelProps } from "reka-ui"
  import { cn } from "@shared/lib/utils"

  const props = defineProps<SelectLabelProps & { class?: HTMLAttributes["class"] }>()

  const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <SelectLabel
    v-bind="delegatedProps"
    :class="cn('px-2 py-1.5 text-xs text-muted-foreground', props.class)"
  >
    <slot />
  </SelectLabel>
</template>

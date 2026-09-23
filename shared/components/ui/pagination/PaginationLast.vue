<script setup lang="ts">
import type { PaginationLastProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from '@shared/components/ui/button'
import { ChevronsRightIcon } from "@lucide/vue"
import { reactiveOmit } from "@vueuse/core"
import { PaginationLast, useForwardProps } from "reka-ui"
import { cn } from '@shared/utils/utils'
import { buttonVariants } from '@shared/components/ui/button'

const props = withDefaults(defineProps<PaginationLastProps & {
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}>(), {
  size: "md",
})

const delegatedProps = reactiveOmit(props, "class", "size")
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <PaginationLast
    data-slot="pagination-last"
    :class="cn(buttonVariants({ variant: 'ghost', size }), 'gap-1 px-2.5 sm:pr-2.5', props.class)"
    v-bind="forwarded"
  >
    <slot>
      <ChevronsRightIcon />
    </slot>
  </PaginationLast>
</template>

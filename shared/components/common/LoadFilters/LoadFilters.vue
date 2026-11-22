<script setup lang="ts">
  import { computed } from "vue"
  import { XIcon } from "@lucide/vue"
  import { Badge } from "@shared/components/ui/badge"
  import { Button } from "@shared/components/ui/button"
  import { Separator } from "@shared/components/ui/separator"

  const props = defineProps<{
    center?: boolean
    filters: Record<string, string | undefined>
  }>()

  const emit = defineEmits<{
    clear: []
  }>()

  const search = computed(() => props.filters.search)

  // Every filter except search, which gets its own wording.
  const filterValues = computed(() => {
    return Object.entries(props.filters)
      .filter(([key, value]) => key !== "search" && value)
      .map(([, value]) => value)
  })

  const resultsKey = computed(() => {
    if (search.value && filterValues.value.length) {
      return "features.load.messages.results_search_filters"
    }

    if (search.value) {
      return "features.load.messages.results_search"
    }

    return "features.load.messages.results_filters"
  })
</script>

<template>
  <div>
    <div class="my-3 flex items-center gap-2">
      <i18n-t
        :keypath="resultsKey"
        tag="p"
        class="flex-1"
        :class="{ 'text-center': center }"
      >
        <template #search>
          <strong>"{{ search }}"</strong>
        </template>

        <template #filters>
          <Badge
            v-for="(value, index) in filterValues"
            variant="secondary"
            :key="index"
          >
            {{ value }}
          </Badge>
        </template>
      </i18n-t>

      <Button
        size="icon"
        variant="ghost"
        @click="emit('clear')"
      >
        <XIcon />
      </Button>
    </div>

    <Separator />
  </div>
</template>

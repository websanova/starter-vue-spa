<script setup lang="ts">
  import { computed } from "vue"
  import { XIcon } from "@lucide/vue"
  import { Load } from "@shared/components/common/Load"
  import { PaginationNumbered } from "@shared/components/common/PaginationNumbered"
  import { Badge } from "@shared/components/ui/badge"
  import { Button } from "@shared/components/ui/button"
  import { Separator } from "@shared/components/ui/separator"
  import type { PaginationMeta } from "@shared/models/pagination"

  const props = defineProps<{
    center?: boolean
    error: Error | null
    filters?: Record<string, string | undefined>
    i18nKey: string
    isPending: boolean
    meta?: PaginationMeta
  }>()

  const emit = defineEmits<{
    clear: []
  }>()

  const page = defineModel<number>("page", { required: true })

  const search = computed(() => props.filters?.search)

  // Every filter except search, which gets its own wording.
  const filterValues = computed(() => {
    return Object.entries(props.filters ?? {})
      .filter(([key, value]) => key !== "search" && value)
      .map(([, value]) => value)
  })

  const isFiltered = computed(() => !!search.value || filterValues.value.length > 0)

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
  <Load
    :center="center"
    :error="error"
    :is-pending="isPending"
    :i18n-key="i18nKey"
  >
    <div v-if="isFiltered">
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

    <slot v-if="meta?.total" />

    <p
      v-else
      class="my-3 text-muted-foreground"
      :class="{ 'text-center': center }"
    >
      {{ $t('features.load.messages.no_results', { noun: $t(i18nKey) }) }}
    </p>

    <PaginationNumbered
      v-if="meta"
      v-model:page="page"
      :total="meta.total"
      :per-page="meta.perPage"
    />
  </Load>
</template>

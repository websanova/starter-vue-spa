<script setup lang="ts">
  import { computed } from "vue"
  import { usePagination } from "@shared/composables/support/usePagination"
  import { Load } from "@shared/components/common/Load"
  import { PaginationNumbered } from "@shared/components/common/PaginationNumbered"
  import { Badge } from "@shared/components/ui/badge"
  import { Separator } from "@shared/components/ui/separator"
  import type { PaginationMeta } from "@shared/models/pagination"

  const props = defineProps<{
    center?: boolean
    error: Error | null
    filters?: Record<string, string | undefined>
    isPending: boolean
    meta?: PaginationMeta
    model: string
  }>()

  const { page } = usePagination()

  const query = computed(() => props.filters?.query)

  // Every filter except query, which gets its own wording.
  const filterValues = computed(() => {
    return Object.entries(props.filters ?? {})
      .filter(([key, value]) => key !== "query" && value)
      .map(([, value]) => value)
  })

  const isFiltered = computed(() => !!query.value || filterValues.value.length > 0)

  const resultsKey = computed(() => {
    const prefix = props.meta?.total ? "results" : "no_results"

    if (query.value && filterValues.value.length) {
      return `features.load.messages.${prefix}_query_filters`
    }

    if (query.value) {
      return `features.load.messages.${prefix}_query`
    }

    return `features.load.messages.${prefix}_filters`
  })
</script>

<template>
  <Load
    :center="center"
    :error="error"
    :is-pending="isPending"
    :model="model"
  >
    <div v-if="isFiltered">
      <i18n-t
        :keypath="resultsKey"
        tag="p"
        class="my-3"
        :class="{ 'text-center': center }"
      >
        <template #query>
          <strong>"{{ query }}"</strong>
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

      <Separator />
    </div>

    <slot v-if="meta?.total" />

    <p
      v-else-if="!isFiltered"
      class="my-3 text-muted-foreground"
      :class="{ 'text-center': center }"
    >
      {{ $t('features.load.messages.no_results', { model: $t(`features.load.models.${model}`) }) }}
    </p>

    <PaginationNumbered
      v-if="meta"
      v-model:page="page"
      :total="meta.total"
      :per-page="meta.perPage"
    />
  </Load>
</template>

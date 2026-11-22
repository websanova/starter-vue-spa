<script setup lang="ts">
  import { computed } from "vue"
  import { Load } from "@shared/components/common/Load"
  import { LoadFilters } from "@shared/components/common/LoadFilters"
  import { PaginationNumbered } from "@shared/components/common/PaginationNumbered"
  import type { PaginationMeta } from "@shared/models/pagination"

  const props = withDefaults(defineProps<{
    center?: boolean
    error: Error | null
    filters?: Record<string, string | undefined>
    i18nKey: string
    isPending: boolean
    meta?: PaginationMeta
  }>(), {
    filters: () => ({}),
  })

  const emit = defineEmits<{
    clear: []
  }>()

  const page = defineModel<number>("page", { required: true })

  // Search counts as a filter here. It only gets its own wording in the banner.
  const isFiltered = computed(() => Object.values(props.filters).some((value) => !!value))
</script>

<template>
  <Load
    :center="center"
    :error="error"
    :is-pending="isPending"
    :i18n-key="i18nKey"
  >
    <LoadFilters
      v-if="isFiltered"
      :center="center"
      :filters="filters"
      @clear="emit('clear')"
    />

    <slot v-if="meta?.total" />

    <slot
      v-else-if="!isFiltered && $slots.empty"
      name="empty"
    />

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

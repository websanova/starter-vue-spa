<script setup lang="ts">
  import { useBookmarkFilters } from '@/composables/filters/bookmarks'
  import { Heading } from '@shared/components/common/Heading'
  import { Search } from '@shared/components/common/Search'
  import type { User } from '@/models/user'

  defineProps<{
    placeholder?: string
    showSearch?: boolean
    user?: User
  }>()

  const { search } = useBookmarkFilters()
</script>

<template>
  <Heading class="flex items-center justify-between">
    <template v-if="user">
      {{ user.firstName }} {{ user.lastName }}
    </template>

    <template v-else>
      {{ placeholder }}
    </template>

    <Search
      v-if="showSearch"
      v-model="search"
      :placeholder="$t('features.ph.search')"
    />
  </Heading>
</template>

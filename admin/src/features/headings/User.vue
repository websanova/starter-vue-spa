<script setup lang="ts">
  import { useBookmarkParams } from '@/composables/params/useBookmarkParams'
  import { Heading, HeadingSearch } from '@shared/components/common/Heading'
  import type { User } from '@/models/user'

  defineProps<{
    placeholder?: string
    showSearch?: boolean
    user?: User
  }>()

  const { search } = useBookmarkParams()
</script>

<template>
  <Heading class="flex items-center justify-between">
    <template v-if="user">
      {{ user.firstName }} {{ user.lastName }}
    </template>

    <template v-else>
      {{ placeholder }}
    </template>

    <HeadingSearch
      v-if="showSearch"
      v-model="search"
      :placeholder="$t('features.ph.search')"
    />
  </Heading>
</template>

<script setup lang="ts">
  import { useBookmarkParams } from '@/composables/params/useBookmarkParams'
  import { HeadingSearch } from '@shared/components/common/Heading'

  const { search } = useBookmarkParams()
</script>

<template>
  <HeadingSearch
    v-model="search"
    :placeholder="$t('features.ph.search')"
  />
</template>

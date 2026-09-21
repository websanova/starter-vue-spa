<script setup lang="ts">
  import { usePagination } from '@shared/composables/support/usePagination'
  import { Heading } from '@shared/components/common/Heading'
  import { Search } from '@shared/components/common/Search'

  const { search } = usePagination()
</script>

<template>
  <Heading
    class="flex items-center justify-between"
    :margin="false"
  >
    {{ $t('features.heading.users') }}

    <Search
      v-model="search"
      :placeholder="$t('features.ph.search')"
    />
  </Heading>
</template>

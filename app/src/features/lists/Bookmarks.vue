<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useBookmarks } from '@/composables/api/bookmarks'
  import { PaginationNumbered } from '@shared/components/common/PaginationNumbered'

  const route = useRoute()
  const router = useRouter()

  const page = computed({
    get: () => Number(route.query.page) || 1,
    set: (value) => router.push({ query: { ...route.query, page: value } }),
  })

  const { data, isPending, error } = useBookmarks(page)
</script>

<template>
  <div>
    <p v-if="isPending">Loading...</p>
    <p v-else-if="error">{{ error.message }}</p>

    <template v-else-if="data">
      <ul>
        <li
          v-for="bookmark in data.bookmarks"
          :key="bookmark.id"
        >
          {{ bookmark.title }}
        </li>
      </ul>

      <PaginationNumbered
        v-model:page="page"
        :total="data.meta.total"
        :per-page="data.meta.perPage"
      />
    </template>
  </div>
</template>

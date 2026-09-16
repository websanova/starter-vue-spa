<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useBookmarks } from '@/composables/api/bookmarks'
  import BookmarkItem from '@/features/items/Bookmark.vue'
  import { PaginationNumbered } from '@shared/components/common/PaginationNumbered'
  import { ItemGroup } from '@shared/components/ui/item'
  import type { BookmarkFilters } from '@/models/bookmark'

  const route = useRoute()
  const router = useRouter()

  const page = computed({
    get: () => Number(route.query.page) || 1,
    set: (value) => router.push({ query: { ...route.query, page: value } }),
  })

  const filters = computed<BookmarkFilters>(() => ({
    page: page.value,
    tag_id: route.query.tag_id as string | undefined,
  }))

  const { data, isPending, error } = useBookmarks(filters)
</script>

<template>
  <div>
    <p v-if="isPending">Loading...</p>
    <p v-else-if="error">{{ error.message }}</p>

    <template v-else-if="data">
      <ItemGroup>
        <BookmarkItem
          v-for="bookmark in data.bookmarks"
          :key="bookmark.id"
          :bookmark="bookmark"
        />
      </ItemGroup>

      <PaginationNumbered
        v-model:page="page"
        :total="data.meta.total"
        :per-page="data.meta.perPage"
      />
    </template>
  </div>
</template>

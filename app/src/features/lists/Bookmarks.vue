<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useBookmarks } from '@/composables/api/bookmarks'
  import { useTags } from '@/composables/api/tags'
  import { usePagination } from '@shared/composables/support/usePagination'
  import BookmarkItem from '@/features/items/Bookmark.vue'
  import { LoadPaginate } from '@shared/components/common/LoadPaginate'
  import { ItemGroup } from '@shared/components/ui/item'
  import type { BookmarkFilters } from '@/models/bookmark'

  const route = useRoute()

  const { page } = usePagination()

  const filters = computed<BookmarkFilters>(() => ({
    page: page.value,
    tag_id: route.query.tag_id as string | undefined,
  }))

  const { data, isPending, error } = useBookmarks(filters)

  const { data: tags } = useTags()

  const tagName = computed(() => {
    return tags.value?.find((tag) => String(tag.id) === filters.value.tag_id)?.name
  })
</script>

<template>
  <div>
    <LoadPaginate
      model="bookmarks"
      :error="error"
      :filters="{ tag: tagName }"
      :is-pending="isPending"
      :meta="data?.meta"
    >
      <ItemGroup>
        <BookmarkItem
          v-for="bookmark in data?.bookmarks"
          :key="bookmark.id"
          :bookmark="bookmark"
        />
      </ItemGroup>
    </LoadPaginate>
  </div>
</template>

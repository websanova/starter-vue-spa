<script setup lang="ts">
  import { computed } from 'vue'
  import { useUserBookmarks } from '@/composables/api/bookmarks'
  import { usePagination } from '@shared/composables/support/usePagination'
  import BookmarkItem from '@/features/items/Bookmark.vue'
  import { LoadPaginate } from '@shared/components/common/LoadPaginate'
  import { ItemGroup } from '@shared/components/ui/item'
  import type { BookmarkFilters } from '@/models/bookmark'
  import type { User } from '@/models/user'

  const props = defineProps<{
    user: User
  }>()

  const { page } = usePagination()

  const filters = computed<BookmarkFilters>(() => ({
    page: page.value,
  }))

  const { data, isPending, error } = useUserBookmarks(props.user.id, filters)
</script>

<template>
  <div>
    <LoadPaginate
      model="bookmarks"
      :error="error"
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

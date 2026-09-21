<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
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

  const router = useRouter()

  const { page, search } = usePagination()

  const filters = computed<BookmarkFilters>(() => ({
    page: page.value,
    search: search.value,
  }))

  const { data, isPending, error } = useUserBookmarks(props.user.id, filters)

  function onClear() {
    router.push({ query: {} })
  }
</script>

<template>
  <div>
    <LoadPaginate
      model="bookmarks"
      :error="error"
      :filters="{ search }"
      :is-pending="isPending"
      :meta="data?.meta"
      @clear="onClear"
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

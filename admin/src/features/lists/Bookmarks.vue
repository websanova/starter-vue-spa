<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useUserBookmarks } from '@/composables/api/bookmarks'
  import { useBookmarkParams } from '@/composables/params/bookmarks'
  import BookmarkItem from '@/components/items/Bookmark.vue'
  import { LoadPaginate } from '@shared/components/common/LoadPaginate'
  import { ItemGroup } from '@shared/components/ui/item'
  import type { User } from '@/models/user'

  const props = defineProps<{
    user: User
  }>()

  const router = useRouter()

  const params = useBookmarkParams()
  const { page, search } = params

  const { data, isPending, error } = useUserBookmarks(props.user.id, params)

  function onClear() {
    router.push({ query: {} })
  }
</script>

<template>
  <div>
    <LoadPaginate
      v-model:page="page"
      i18n-key="features.load.nouns.bookmarks"
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

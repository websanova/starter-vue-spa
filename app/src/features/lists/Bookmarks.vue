<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useBookmarks } from '@/composables/api/bookmarks'
  import { useTags } from '@/composables/api/tags'
  import { useBookmarkParams } from '@/composables/params/bookmarks'
  import { useDialogService } from '@shared/composables/services/dialog'
  import BookmarkItem from '@/components/items/Bookmark.vue'
  import BookmarksEmpty from '@/features/empties/Bookmarks.vue'
  import { LoadPaginate } from '@shared/components/common/LoadPaginate'
  import { ItemGroup } from '@shared/components/ui/item'
  import type { BookmarkView } from '@/models/bookmark'

  defineProps<{
    view?: BookmarkView
  }>()

  const router = useRouter()

  const dialog = useDialogService()

  const params = useBookmarkParams()
  const { page, search, tagId } = params

  const { data, isPending, error } = useBookmarks(params)

  const { data: tags } = useTags()

  const tagName = computed(() => {
    return tags.value?.find((tag) => String(tag.id) === tagId.value)?.name
  })

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
      :filters="{ search, tag: tagName }"
      :is-pending="isPending"
      :meta="data?.meta"
      @clear="onClear"
    >
      <ItemGroup>
        <BookmarkItem
          v-for="bookmark in data?.bookmarks"
          :key="bookmark.id"
          :bookmark="bookmark"
          :view="view"
          @edit="dialog.open('bookmarkUpdate', { bookmark })"
          @delete="dialog.open('bookmarkDelete', { bookmark })"
        />
      </ItemGroup>

      <template #empty>
        <BookmarksEmpty />
      </template>
    </LoadPaginate>
  </div>
</template>

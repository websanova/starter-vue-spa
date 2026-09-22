<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useBookmarks } from '@/composables/api/bookmarks'
  import { useTags } from '@/composables/api/tags'
  import { useBookmarkParams } from '@/composables/params/bookmarks'
  import BookmarkItem from '@/features/items/Bookmark.vue'
  import { LoadPaginate } from '@shared/components/common/LoadPaginate'
  import { ItemGroup } from '@shared/components/ui/item'

  defineProps<{
    condensed?: boolean
  }>()

  const router = useRouter()

  const params = useBookmarkParams()
  const { search, tagId } = params

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
      model="bookmarks"
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
          :condensed="condensed"
        />
      </ItemGroup>
    </LoadPaginate>
  </div>
</template>

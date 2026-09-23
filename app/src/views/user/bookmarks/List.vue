<script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthStore } from '@shared/stores/auth'
  import { useSettingsStore } from '@shared/stores/settings'
  import BookmarksHeading from '@/features/headings/Bookmarks.vue'
  import BookmarksList from '@/features/lists/Bookmarks.vue'
  import type { BookmarkView } from '@/models/bookmark'

  const auth = useAuthStore()
  const settings = useSettingsStore()

  const view = ref<BookmarkView>(auth.user?.preferences.bookmarksView ?? settings.data.defaultBookmarksView as BookmarkView)
</script>

<template>
  <section>
    <BookmarksHeading v-model:view="view" />

    <BookmarksList :view="view" />
  </section>
</template>

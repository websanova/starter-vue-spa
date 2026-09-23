<script setup lang="ts">
  import { computed } from 'vue'
  import { CalendarIcon, LayoutListIcon, ListIcon, PlusIcon, TypeIcon } from '@lucide/vue'
  import { useBookmarkParams } from '@/composables/params/bookmarks'
  import { usePreferences } from '@/composables/support/preferences'
  import { useDialogService } from '@shared/composables/services/dialog'
  import { useI18n } from '@shared/plugins/i18n'
  import { Heading, HeadingSearch, HeadingSort } from '@shared/components/common/Heading'
  import { Button } from '@shared/components/ui/button'

  const dialog = useDialogService()
  const i18n = useI18n()

  const { bookmarksView } = usePreferences()

  const { search, sortBy, sortDir } = useBookmarkParams()

  const sortFields = computed(() => [
    { value: 'title', label: i18n.t('features.heading.sort.title'), icon: TypeIcon },
    { value: 'created_at', label: i18n.t('features.heading.sort.created_at'), icon: CalendarIcon },
  ])

  function onToggleView() {
    bookmarksView.value = bookmarksView.value === 'condensed' ? 'expanded' : 'condensed'
  }
</script>

<template>
  <Heading
    class="flex items-center justify-between"
    :margin="false"
  >
    {{ $t('features.lbl.bookmarks') }}

    <div class="flex items-center gap-2">
      <HeadingSearch
        v-model="search"
        :placeholder="$t('features.ph.search')"
      />

      <Button
        size="icon"
        variant="outline"
        @click="onToggleView"
      >
        <LayoutListIcon v-if="bookmarksView === 'condensed'" />
        <ListIcon v-else />
      </Button>

      <HeadingSort
        v-model:sort-by="sortBy"
        v-model:sort-dir="sortDir"
        :fields="sortFields"
      />

      <Button
        size="icon"
        @click="dialog.open('bookmarkCreate')"
      >
        <PlusIcon />
      </Button>
    </div>
  </Heading>
</template>

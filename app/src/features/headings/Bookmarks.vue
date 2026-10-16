<script setup lang="ts">
  import { computed } from 'vue'
  import { CalendarIcon, LayoutListIcon, ListIcon, PlusIcon, TypeIcon } from '@lucide/vue'
  import { useBookmarkParams } from '@/composables/params/useBookmarkParams'
  import { usePreferences } from '@/composables/support/usePreferences'
  import { useDialogService } from '@shared/composables/services/useDialogService'
  import { useI18n } from '@shared/plugins/i18n'
  import { Heading, HeadingFilter, HeadingSearch, HeadingSort } from '@shared/components/common/Heading'
  import { Button } from '@shared/components/ui/button'

  const dialog = useDialogService()
  const i18n = useI18n()

  const { bookmarksView } = usePreferences()

  const { favorited, search, sortBy, sortDir } = useBookmarkParams()

  const filters = computed({
    get: () => ({ favorited: favorited.value }),
    set: (value) => {
      favorited.value = value.favorited
    },
  })

  const filterGroups = computed(() => [
    {
      name: 'favorited',
      options: [
        { value: '', label: i18n.t('features.lbl.all') },
        { value: '1', label: i18n.t('features.heading.filter.favorited') },
        { value: '0', label: i18n.t('features.heading.filter.unfavorited') },
      ],
    },
  ])

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

      <HeadingFilter
        v-model="filters"
        :groups="filterGroups"
      />

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

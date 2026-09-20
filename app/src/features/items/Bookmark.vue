<script setup lang="ts">
  import { BookmarkIcon, PencilIcon, Trash2Icon } from '@lucide/vue'
  import { useDialogService } from '@shared/composables/services/dialog'
  import { Item, ItemDropdown } from '@shared/components/common/Item'
  import { Badge } from '@shared/components/ui/badge'
  import { DropdownMenuItem } from '@shared/components/ui/dropdown-menu'
  import type { Bookmark } from '@/models/bookmark'

  const props = defineProps<{
    bookmark: Bookmark
    condensed?: boolean
  }>()

  const dialog = useDialogService()
</script>

<template>
  <Item :class="condensed && 'py-0'">
    <template #icon>
      <BookmarkIcon />
    </template>

    <template #title>
      <a
        :href="bookmark.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ bookmark.title }}
      </a>
    </template>

    <a
      v-if="!condensed"
      class="w-fit max-w-full truncate text-sm text-link"
      :href="bookmark.url"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ bookmark.url }}
    </a>

    <div
      v-if="!condensed && bookmark.tags.length"
      class="flex flex-wrap gap-1"
    >
      <Badge
        v-for="tag in bookmark.tags"
        as-child
        variant="secondary"
        :key="tag.id"
      >
        <RouterLink :to="{ name: 'user-bookmarks', query: { tag_id: tag.id } }">
          {{ tag.name }}
        </RouterLink>
      </Badge>
    </div>

    <template #actions>
      <ItemDropdown>
        <DropdownMenuItem @select="dialog.open('bookmarkUpdate', { bookmark: props.bookmark })">
          <PencilIcon />
          {{ $t('features.lbl.edit') }}
        </DropdownMenuItem>

        <DropdownMenuItem @select="dialog.open('bookmarkDelete', { bookmark: props.bookmark })">
          <Trash2Icon />
          {{ $t('features.lbl.delete') }}
        </DropdownMenuItem>
      </ItemDropdown>
    </template>
  </Item>
</template>

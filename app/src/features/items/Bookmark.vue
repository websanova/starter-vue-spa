<script setup lang="ts">
  import { BookmarkIcon, PencilIcon, Trash2Icon } from '@lucide/vue'
  import { useDialogService } from '@shared/composables/services/dialog'
  import { DropdownActions } from '@shared/components/common/DropdownActions'
  import { Badge } from '@shared/components/ui/badge'
  import { DropdownMenuItem } from '@shared/components/ui/dropdown-menu'
  import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@shared/components/ui/item'
  import type { Bookmark } from '@/models/bookmark'

  const props = defineProps<{
    bookmark: Bookmark
  }>()

  const dialog = useDialogService()
</script>

<template>
  <Item class="flex-nowrap">
    <ItemMedia>
      <BookmarkIcon />
    </ItemMedia>

    <ItemContent class="min-w-0">
      <ItemTitle class="max-w-full">
        <span class="truncate">{{ bookmark.title }}</span>
      </ItemTitle>

      <a
        class="block truncate text-sm text-link"
        :href="bookmark.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ bookmark.url }}
      </a>

      <div
        v-if="bookmark.tags.length"
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

      <ItemDescription v-if="bookmark.description">
        {{ bookmark.description }}
      </ItemDescription>
    </ItemContent>

    <ItemActions>
      <DropdownActions>
        <DropdownMenuItem @select="dialog.open('bookmarkUpdate', { bookmark: props.bookmark })">
          <PencilIcon />
          {{ $t('features.lbl.edit') }}
        </DropdownMenuItem>

        <DropdownMenuItem @select="dialog.open('bookmarkDelete', { bookmark: props.bookmark })">
          <Trash2Icon />
          {{ $t('features.lbl.delete') }}
        </DropdownMenuItem>
      </DropdownActions>
    </ItemActions>
  </Item>
</template>

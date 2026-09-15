<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { PencilIcon, TagIcon, Trash2Icon } from '@lucide/vue'
  import { useTags } from '@/composables/api/tags'
  import { Loading } from '@shared/components/common/Loading'
  import { Navbar, NavDivider, NavItem, NavItemMenu } from '@shared/components/common/Navbar'
  import { DropdownMenuItem } from '@shared/components/ui/dropdown-menu'
  import type { Tag } from '@/models/tag'

  const emit = defineEmits<{
    edit: [tag: Tag]
    delete: [tag: Tag]
  }>()

  const route = useRoute()

  const { data: tags, isPending, error } = useTags()
</script>

<template>
  <Navbar
    orientation="vertical"
  >
    <NavItem
      exact-active-class=""
      :class="{ 'router-link-exact-active': !route.query.tag_id }"
      :to="{ name: 'user-bookmarks', query: { tag_id: undefined } }"
    >
      <TagIcon />
      {{ $t('features.lbl.all') }}
    </NavItem>

    <!-- <NavDivider /> -->

    <Loading v-if="isPending" />

    <p v-else-if="error">
      {{ error.message }}
    </p>

    <NavItemMenu
      v-else
      v-for="tag in tags"
      exact-active-class=""
      :key="tag.id"
      :class="{ 'router-link-exact-active': route.query.tag_id === String(tag.id) }"
      :to="{ name: 'user-bookmarks', query: { tag_id: tag.id } }"
    >
      <TagIcon />
      <span class="truncate">{{ tag.name }}</span>

      <template #actions>
        <DropdownMenuItem @select="emit('edit', tag)">
          <PencilIcon />
          {{ $t('features.lbl.edit') }}
        </DropdownMenuItem>

        <DropdownMenuItem @select="emit('delete', tag)">
          <Trash2Icon />
          {{ $t('features.lbl.delete') }}
        </DropdownMenuItem>
      </template>
    </NavItemMenu>
  </Navbar>
</template>

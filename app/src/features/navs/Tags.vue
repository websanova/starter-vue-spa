<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { FolderIcon, TagIcon } from '@lucide/vue'
  import { useTags } from '@/composables/api/tags'
  import { Loading } from '@shared/components/common/Loading'
  import { Navbar, NavDivider, NavItem } from '@shared/components/common/Navbar'

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
      <FolderIcon />
      {{ $t('features.lbl.all') }}
    </NavItem>

    <NavDivider />

    <Loading v-if="isPending" />

    <p v-else-if="error">
      {{ error.message }}
    </p>

    <NavItem
      v-else
      v-for="tag in tags"
      exact-active-class=""
      :key="tag.id"
      :class="{ 'router-link-exact-active': route.query.tag_id === String(tag.id) }"
      :to="{ name: 'user-bookmarks', query: { tag_id: tag.id } }"
    >
      <TagIcon />
      {{ tag.name }}
    </NavItem>
  </Navbar>
</template>

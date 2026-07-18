<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { FolderIcon } from '@lucide/vue'
  import { Navbar, NavDivider, NavItem } from '@shared/components/common/Navbar'

  const route = useRoute()
</script>

<template>
  <Navbar
    orientation="vertical"
  >
    <NavItem
      exact-active-class=""
      :class="{ 'router-link-exact-active': !route.query.folder_id }"
      :to="{ name: 'user-bookmarks', query: { folder_id: undefined } }"
    >
      <FolderIcon class="size-4" />
      {{ $t('features.lbl.all') }}
    </NavItem>

    <NavDivider />

    <NavItem
      exact-active-class=""
      :class="{ 'router-link-exact-active': route.query.folder_id === '1' }"
      :to="{ name: 'user-bookmarks', query: { folder_id: 1 } }"
    >
      <FolderIcon class="size-4" />
      Folder One
    </NavItem>

    <NavItem
      exact-active-class=""
      :class="{ 'router-link-exact-active': route.query.folder_id === '2' }"
      :to="{ name: 'user-bookmarks', query: { folder_id: 2 } }"
    >
      <FolderIcon class="size-4" />
      Folder Two
    </NavItem>

    <NavItem
      exact-active-class=""
      :class="{ 'router-link-exact-active': route.query.folder_id === '3' }"
      :to="{ name: 'user-bookmarks', query: { folder_id: 3 } }"
    >
      <FolderIcon class="size-4" />
      Folder Three
    </NavItem>
  </Navbar>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
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
      {{ $t('features.lbl.all') }}
    </NavItem>

    <NavDivider />

    <NavItem
      exact-active-class=""
      :class="{ 'router-link-exact-active': route.query.folder_id === '1' }"
      :to="{ name: 'user-bookmarks', query: { folder_id: 1 } }"
    >
      Folder One
    </NavItem>

    <NavItem
      exact-active-class=""
      :class="{ 'router-link-exact-active': route.query.folder_id === '2' }"
      :to="{ name: 'user-bookmarks', query: { folder_id: 2 } }"
    >
      Folder Two
    </NavItem>

    <NavItem
      exact-active-class=""
      :class="{ 'router-link-exact-active': route.query.folder_id === '3' }"
      :to="{ name: 'user-bookmarks', query: { folder_id: 3 } }"
    >
      Folder Three
    </NavItem>
  </Navbar>
</template>

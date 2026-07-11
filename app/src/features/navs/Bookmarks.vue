<script setup lang="ts">
  import { Navbar, NavDivider, NavItem } from '@shared/components/common/Navbar'
</script>

<template>
  <Navbar
    orientation="vertical"
  >
    <NavDivider />
    <NavItem :to="{ name: 'user-bookmarks', query: { folder_id: undefined } }">All</NavItem>
    <NavDivider />
    <NavItem :to="{ name: 'user-bookmarks', query: { folder_id: 1 } }">Folder One</NavItem>
    <NavItem :to="{ name: 'user-bookmarks', query: { folder_id: 2 } }">Folder Two</NavItem>
    <NavItem :to="{ name: 'user-bookmarks', query: { folder_id: 3 } }">Folder Three</NavItem>
  </Navbar>
</template>

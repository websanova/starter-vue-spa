<script setup lang="ts">
  import { FolderIcon } from '@lucide/vue'
  import { Navbar, NavItem } from '@shared/components/common/Navbar'
</script>

<template>
  <Navbar
    orientation="vertical"
  >
    <NavItem :to="{ name: 'user-bookmarks' }">
      <FolderIcon />
      {{ $t('features.lbl.all') }}
    </NavItem>
  </Navbar>
</template>

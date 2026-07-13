<script setup lang="ts">
  import { LayersIcon, ShapesIcon, UsersIcon } from '@lucide/vue'
  import { Navbar, NavItem } from '@shared/components/common/Navbar'
</script>

<template>
  <Navbar
    orientation="vertical"
  >
    <NavItem :to="{ name: 'user-users' }">
      <UsersIcon />
      {{ $t('features.lbl.users') }}
    </NavItem>

    <NavItem :to="{ name: 'user-plans' }">
      <LayersIcon />
      {{ $t('features.lbl.plans') }}
    </NavItem>

    <NavItem :to="{ name: 'user-icons' }">
      <ShapesIcon />
      {{ $t('features.lbl.icons') }}
    </NavItem>
  </Navbar>
</template>

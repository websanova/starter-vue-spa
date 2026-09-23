<script setup lang="ts">
  import { ChartColumnIcon, LayersIcon, ShapesIcon, UsersIcon } from '@lucide/vue'
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

    <NavItem :to="{ name: 'user-stats' }">
      <ChartColumnIcon />
      {{ $t('features.lbl.stats') }}
    </NavItem>

    <NavItem :to="{ name: 'user-icons' }">
      <ShapesIcon />
      {{ $t('features.lbl.icons') }}
    </NavItem>
  </Navbar>
</template>

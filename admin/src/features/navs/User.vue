<script setup lang="ts">
  import { Navbar, NavItem } from '@shared/components/common/Navbar'
</script>

<template>
  <Navbar
    orientation="vertical"
  >
    <NavItem :to="{ name: 'user-users' }">{{ $t('features.lbl.users') }}</NavItem>
    <NavItem :to="{ name: 'user-plans' }">{{ $t('features.lbl.plans') }}</NavItem>
    <NavItem :to="{ name: 'user-icons' }">{{ $t('features.lbl.icons') }}</NavItem>
  </Navbar>
</template>

<script setup lang="ts">
  import { Navbar, NavDivider, NavItem } from '@shared/components/common/Navbar'
</script>

<template>
  <Navbar
    orientation="vertical"
  >
    <NavItem :to="{ name: 'user-account-profile' }">{{ $t('features.lbl.profile') }}</NavItem>
    <NavItem :to="{ name: 'user-account-billing' }">{{ $t('features.lbl.billing') }}</NavItem>
    <NavItem :to="{ name: 'user-account-settings' }">{{ $t('features.lbl.settings') }}</NavItem>
    <NavItem :to="{ name: 'user-account-security' }">{{ $t('features.lbl.security') }}</NavItem>
  </Navbar>
</template>

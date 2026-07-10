<script setup lang="ts">
  import { Navbar, NavDivider, NavItem } from '@shared/components/common/Navbar'
</script>

<template>
  <Navbar
    orientation="vertical"
  >
    <NavItem :to="{ name: 'user-todos' }">Todos</NavItem>
    <NavItem :to="{ name: 'user-account' }">Account</NavItem>
    <NavItem :to="{ name: 'user-settings' }">Settings</NavItem>
    <NavDivider />
    <NavItem :to="{ name: 'user-billing' }">Billing</NavItem>
    <NavItem :to="{ name: 'user-plans' }">Plans</NavItem>
  </Navbar>
</template>

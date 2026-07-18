<script setup lang="ts">
  import { CreditCardIcon, SettingsIcon, ShieldIcon, UserIcon } from '@lucide/vue'
  import { Navbar, NavDivider, NavItem } from '@shared/components/common/Navbar'
</script>

<template>
  <Navbar
    orientation="vertical"
  >
    <NavItem :to="{ name: 'user-account-profile' }">
      <UserIcon class="size-4" />
      {{ $t('features.lbl.profile') }}
    </NavItem>

    <NavItem :to="{ name: 'user-account-billing' }">
      <CreditCardIcon class="size-4" />
      {{ $t('features.lbl.billing') }}
    </NavItem>

    <NavItem :to="{ name: 'user-account-settings' }">
      <SettingsIcon class="size-4" />
      {{ $t('features.lbl.settings') }}
    </NavItem>

    <NavItem :to="{ name: 'user-account-security' }">
      <ShieldIcon class="size-4" />
      {{ $t('features.lbl.security') }}
    </NavItem>
  </Navbar>
</template>

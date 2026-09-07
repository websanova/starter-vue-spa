<script setup lang="ts">
  import { CreditCardIcon, LayersIcon, SettingsIcon, UserIcon } from '@lucide/vue'
  import { Navbar, NavDivider, NavItem } from '@shared/components/common/Navbar'
</script>

<template>
  <Navbar
    orientation="vertical"
  >
    <NavItem :to="{ name: 'user-account-profile' }">
      <UserIcon />
      {{ $t('features.lbl.profile') }}
    </NavItem>

    <NavItem :to="{ name: 'user-account-billing' }">
      <CreditCardIcon />
      {{ $t('features.lbl.billing') }}
    </NavItem>

    <NavItem :to="{ name: 'user-account-settings' }">
      <SettingsIcon />
      {{ $t('features.lbl.settings') }}
    </NavItem>

    <!--
    <NavItem :to="{ name: 'user-account-security' }">
      <ShieldIcon />
      {{ $t('features.lbl.security') }}
    </NavItem>
    -->

    <NavDivider class="sm:hidden" />

    <NavItem
      class="sm:hidden"
      :to="{ name: 'user-subscribe-plans' }"
    >
      <LayersIcon />
      {{ $t('features.lbl.plans') }}
    </NavItem>
  </Navbar>
</template>

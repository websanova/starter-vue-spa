<script setup lang="ts">
  import { SettingsIcon } from '@lucide/vue'
  import { Body } from '@shared/components/common/Body'
  import { Header } from '@shared/components/common/Header'
  import { Navbar, NavDivider, NavDropdown, NavItem } from '@shared/components/common/Navbar'
  import { Avatar, AvatarFallback, AvatarImage } from '@shared/components/ui/avatar'
  import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@shared/components/ui/dropdown-menu'
  import LogoNav from '@shared/features/navs/Logo.vue'
  import PageTransition from '@shared/features/transitions/Page.vue'
  import { RouterLink } from 'vue-router'

  function onLogo() {
    console.log('onLogo')
  }
</script>

<template>
  <div class="h-screen overflow-hidden flex flex-col">
    <Header>
      <template #logo>
        <LogoNav
          :to="{ name: 'user-landing' }"
          @click="onLogo"
        />
      </template>

      <template #nav>
        <Navbar>
          <NavItem :to="{ name: 'user-todos' }">Todos</NavItem>
          <NavItem :to="{ name: 'user-billing' }">Billing</NavItem>

          <NavDropdown align="end">
            <template #trigger>
              <SettingsIcon />
            </template>
            <DropdownMenuItem as-child>
              <RouterLink :to="{ name: 'user-account' }">Account</RouterLink>
            </DropdownMenuItem>
            <DropdownMenuItem as-child>
              <RouterLink :to="{ name: 'user-settings' }">Settings</RouterLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem as-child>
              <RouterLink :to="{ name: 'user-logout' }">Logout</RouterLink>
            </DropdownMenuItem>
          </NavDropdown>

          <NavDropdown align="end">
            <template #trigger>
              <Avatar size="sm">
                <AvatarImage
                  src="https://www.gravatar.com/avatar/68b1c78d0a9d7a5b9c2e9a4f1e3d2c1b?s=64"
                  alt="Rob"
                />
                <AvatarFallback>RD</AvatarFallback>
              </Avatar>
            </template>
            <DropdownMenuLabel>rob@websanova.com</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem as-child>
              <RouterLink :to="{ name: 'user-plans' }">Plans</RouterLink>
            </DropdownMenuItem>
            <DropdownMenuItem as-child>
              <RouterLink :to="{ name: 'user-billing' }">Billing</RouterLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem as-child>
              <RouterLink :to="{ name: 'user-logout' }">Logout</RouterLink>
            </DropdownMenuItem>
          </NavDropdown>
        </Navbar>
      </template>
    </Header>

    <Body>
      <template #left>
        <Navbar
          orientation="vertical"
          class="p-2"
        >
          <NavItem :to="{ name: 'user-todos' }">Todos</NavItem>
          <NavItem :to="{ name: 'user-account' }">Account</NavItem>
          <NavItem :to="{ name: 'user-settings' }">Settings</NavItem>
          <NavDivider />
          <NavItem :to="{ name: 'user-billing' }">Billing</NavItem>
          <NavItem :to="{ name: 'user-plans' }">Plans</NavItem>
        </Navbar>
      </template>

      <RouterView v-slot="{ Component }" >
        <PageTransition>
          <component :is="Component" />
        </PageTransition>
      </RouterView>
    </Body>
  </div>
</template>

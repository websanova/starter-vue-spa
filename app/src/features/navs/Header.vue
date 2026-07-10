<script setup lang="ts">
  import { SettingsIcon } from '@lucide/vue'
  import { useAuth } from '@shared/composables/support/auth'
  import { Navbar, NavDropdown, NavItem } from '@shared/components/common/Navbar'
  import { Avatar, AvatarFallback, AvatarImage } from '@shared/components/ui/avatar'
  import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@shared/components/ui/dropdown-menu'
  import { RouterLink } from 'vue-router'

  const { user } = useAuth()
</script>

<template>
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
        <Avatar>
          <AvatarImage
            v-if="user?.avatarUrl"
            :src="user.avatarUrl"
          />
          <AvatarFallback>{{ user?.firstName?.charAt(0).toUpperCase() }}</AvatarFallback>
        </Avatar>
      </template>
      <DropdownMenuLabel>{{ user?.email }}</DropdownMenuLabel>
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

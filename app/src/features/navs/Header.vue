<script setup lang="ts">
  import { BellIcon } from '@lucide/vue'
  import { useAuth } from '@shared/composables/support/auth'
  import { Navbar, NavDropdown, NavItem } from '@shared/components/common/Navbar'
  import { Avatar, AvatarFallback, AvatarImage } from '@shared/components/ui/avatar'
  import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@shared/components/ui/dropdown-menu'
  import { RouterLink, useRouter } from 'vue-router'

  const { logout, user } = useAuth()
  const router = useRouter()

  function onLogout() {
    logout()
    router.push({ name: 'auth-landing' })
  }
</script>

<template>
  <Navbar>
    <NavDropdown align="end">
      <template #trigger>
        <BellIcon />
      </template>
      <!-- <DropdownMenuItem as-child>
        <RouterLink :to="{ name: 'user-account' }">Account</RouterLink>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @select="onLogout">Logout</DropdownMenuItem> -->
    </NavDropdown>

    <NavDropdown align="end">
      <template #trigger>
        <Avatar>
          <AvatarImage
            v-if="user?.avatarUrl"
            :src="user.avatarUrl"
          />

          <AvatarFallback>
            {{ user?.firstName?.charAt(0).toUpperCase() }}
          </AvatarFallback>
        </Avatar>
      </template>

      <DropdownMenuItem as-child>
        <RouterLink :to="{ name: 'user-account' }">
          {{ $t('features.lbl.account') }}
        </RouterLink>
      </DropdownMenuItem>

      <DropdownMenuItem as-child>
        <RouterLink :to="{ name: 'user-bookmarks' }">
          {{ $t('features.lbl.bookmarks') }}
        </RouterLink>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem @select="onLogout">
        {{ $t('features.lbl.sign_out') }}
      </DropdownMenuItem>
    </NavDropdown>
  </Navbar>
</template>

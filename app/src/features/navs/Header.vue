<script setup lang="ts">
  import { BellIcon, BookmarkIcon, LogOutIcon, MoonIcon, SunIcon, UserIcon } from '@lucide/vue'
  import { useDarkMode } from '@shared/composables/services/darkMode'
  import { useLogout } from '@shared/composables/services/logout'
  import { Navbar, NavDropdown, NavItem } from '@shared/components/common/Navbar'
  import AccountAvatar from '@shared/features/avatars/Account.vue'
  import { DropdownMenuItem, DropdownMenuSeparator } from '@shared/components/ui/dropdown-menu'

  const emit = defineEmits<{
    notifications: []
    account: []
  }>()

  const { isDark, toggle } = useDarkMode()
  const onLogout = useLogout()
</script>

<template>
  <Navbar>
    <NavDropdown
      align="end"
      class="sm:unhidden"
    >
      <template #trigger>
        <BellIcon class="size-7" />
      </template>
      <!-- <DropdownMenuItem as-child>
        <RouterLink :to="{ name: 'user-account' }">Account</RouterLink>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @select="onLogout">Logout</DropdownMenuItem> -->
    </NavDropdown>

    <NavItem
      class="sm:hidden"
      @click="emit('notifications')"
    >
      <BellIcon />
    </NavItem>

    <NavDropdown
      align="end"
      class="sm:unhidden"
    >
      <template #trigger>
        <AccountAvatar class="size-7" />
      </template>

      <DropdownMenuItem as-child>
        <RouterLink :to="{ name: 'user-account' }">
          <UserIcon />
          {{ $t('features.lbl.account') }}
        </RouterLink>
      </DropdownMenuItem>

      <DropdownMenuItem as-child>
        <RouterLink :to="{ name: 'user-bookmarks' }">
          <BookmarkIcon />
          {{ $t('features.lbl.bookmarks') }}
        </RouterLink>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem @select="toggle">
        <SunIcon v-if="isDark" />
        <MoonIcon v-else />
        {{ isDark ? $t('features.lbl.light_mode') : $t('features.lbl.dark_mode') }}
      </DropdownMenuItem>

      <DropdownMenuItem @select="onLogout">
        <LogOutIcon />
        {{ $t('features.lbl.sign_out') }}
      </DropdownMenuItem>
    </NavDropdown>

    <NavItem
      class="sm:hidden"
      @click="emit('account')"
    >
      <AccountAvatar class="size-7" />
    </NavItem>
  </Navbar>
</template>

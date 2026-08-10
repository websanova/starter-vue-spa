<script setup lang="ts">
  import { BellIcon, BookmarkIcon, LayersIcon, LogOutIcon, UserIcon } from '@lucide/vue'
  import { useNotificationsUnread } from '@/composables/support/notificationsUnread'
  import { useLogout } from '@shared/composables/support/logout'
  import { Indicator } from '@shared/components/common/Indicator'
  import { Navbar, NavDropdown, NavItem } from '@shared/components/common/Navbar'
  import AccountAvatar from '@shared/features/avatars/Account.vue'
  import { DropdownMenuItem, DropdownMenuSeparator } from '@shared/components/ui/dropdown-menu'

  const emit = defineEmits<{
    notifications: []
    account: []
  }>()

  const onLogout = useLogout()

  const { unread } = useNotificationsUnread()
</script>

<template>
  <Navbar>
    <NavItem @click="emit('notifications')">
      <Indicator :show="unread > 0">
        <BellIcon />
      </Indicator>
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

      <DropdownMenuItem as-child>
        <RouterLink :to="{ name: 'user-subscribe-plans' }">
          <LayersIcon />
          {{ $t('features.lbl.plans') }}
        </RouterLink>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

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

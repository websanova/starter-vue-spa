<script setup lang="ts">
  import { LogOutIcon, MoonIcon, SunIcon } from '@lucide/vue'
  import { useColorScheme } from '@shared/composables/support/useColorScheme'
  import { useLogout } from '@shared/composables/support/logout'
  import { Navbar, NavDropdown, NavItem } from '@shared/components/common/Navbar'
  import AccountAvatar from '@shared/features/avatars/Account.vue'
  import { DropdownMenuItem } from '@shared/components/ui/dropdown-menu'

  const emit = defineEmits<{
    account: []
  }>()

  const { isDark, toggle } = useColorScheme()
  const onLogout = useLogout()
</script>

<template>
  <Navbar>
    <NavDropdown
      align="end"
      class="sm:unhidden"
    >
      <template #trigger>
        <AccountAvatar class="size-7" />
      </template>

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

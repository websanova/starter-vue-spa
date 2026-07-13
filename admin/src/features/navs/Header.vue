<script setup lang="ts">
  import { useDarkMode } from '@shared/composables/support/darkMode'
  import { useLogout } from '@shared/composables/support/logout'
  import { Navbar, NavDropdown, NavItem } from '@shared/components/common/Navbar'
  import AccountAvatar from '@shared/features/avatars/Account.vue'
  import { DropdownMenuItem } from '@shared/components/ui/dropdown-menu'

  const emit = defineEmits<{
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
        <AccountAvatar />
      </template>

      <DropdownMenuItem @select="toggle">
        {{ isDark ? $t('features.lbl.light_mode') : $t('features.lbl.dark_mode') }}
      </DropdownMenuItem>

      <DropdownMenuItem @select="onLogout">
        {{ $t('features.lbl.sign_out') }}
      </DropdownMenuItem>
    </NavDropdown>

    <NavItem
      class="sm:hidden"
      @click="emit('account')"
    >
      <AccountAvatar />
    </NavItem>
  </Navbar>
</template>

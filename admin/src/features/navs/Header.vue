<script setup lang="ts">
  import { useLogout } from '@shared/composables/support/logout'
  import { Navbar, NavDropdown, NavItem } from '@shared/components/common/Navbar'
  import AccountAvatar from '@shared/features/avatars/Account.vue'
  import { DropdownMenuItem } from '@shared/components/ui/dropdown-menu'

  const emit = defineEmits<{
    account: []
  }>()

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

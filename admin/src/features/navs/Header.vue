<script setup lang="ts">
  import { useAuth } from '@shared/composables/support/auth'
  import { Navbar, NavDropdown, NavItem } from '@shared/components/common/Navbar'
  import AccountAvatar from '@shared/features/avatars/Account.vue'
  import { DropdownMenuItem } from '@shared/components/ui/dropdown-menu'
  import { useRouter } from 'vue-router'

  const emit = defineEmits<{
    account: []
  }>()

  const { logout } = useAuth()
  const router = useRouter()

  function onLogout() {
    logout()
    router.push({ name: 'auth-landing' })
  }
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

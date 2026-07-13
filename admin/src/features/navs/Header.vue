<script setup lang="ts">
  import { useAuth } from '@shared/composables/support/auth'
  import { Navbar, NavDropdown, NavItem } from '@shared/components/common/Navbar'
  import { Avatar, AvatarFallback, AvatarImage } from '@shared/components/ui/avatar'
  import { DropdownMenuItem } from '@shared/components/ui/dropdown-menu'
  import { useRouter } from 'vue-router'

  const emit = defineEmits<{
    account: []
  }>()

  const { logout, user } = useAuth()
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

      <DropdownMenuItem @select="onLogout">
        {{ $t('features.lbl.sign_out') }}
      </DropdownMenuItem>
    </NavDropdown>

    <NavItem
      class="sm:hidden"
      @click="emit('account')"
    >
      <Avatar>
        <AvatarImage
          v-if="user?.avatarUrl"
          :src="user.avatarUrl"
        />

        <AvatarFallback>
          {{ user?.firstName?.charAt(0).toUpperCase() }}
        </AvatarFallback>
      </Avatar>
    </NavItem>
  </Navbar>
</template>

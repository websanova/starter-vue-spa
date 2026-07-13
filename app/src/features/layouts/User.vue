<script setup lang="ts">
  import { ref } from 'vue'
  import { Layout, LayoutHeader } from '@shared/components/common/Layout'
  import BookmarksSheetMenu from '@/features/sheet-menus/Bookmarks.vue'
  import AccountSheetMenu from '@shared/features/sheet-menus/Account.vue'
  import NotificationsSheetMenu from '@shared/features/sheet-menus/Notifications.vue'
  import HeaderNav from '@/features/navs/Header.vue'
  import AccountNav from '@/features/navs/Account.vue'
  import LogoNav from '@shared/features/navs/Logo.vue'
  import LayoutTransition from '@shared/features/transitions/Layout.vue'

  const bookmarksMenuOpen = ref(false)
  const accountMenuOpen = ref(false)
  const notificationsMenuOpen = ref(false)

  function onLogo() {
    bookmarksMenuOpen.value = true
  }
</script>

<template>
  <Layout header-height="3rem">
    <LayoutHeader>
      <template #logo>
        <LogoNav
          :to="{ name: 'user-landing' }"
          @click="onLogo"
        />
      </template>

      <template #nav>
        <HeaderNav
          @account="accountMenuOpen = true"
          @notifications="notificationsMenuOpen = true"
        />
      </template>
    </LayoutHeader>

    <BookmarksSheetMenu
      v-model:open="bookmarksMenuOpen"
      header-height="3rem"
      side="left"
    />

    <AccountSheetMenu
      v-model:open="accountMenuOpen"
      header-height="3rem"
      side="right"
    >
      <AccountNav />
    </AccountSheetMenu>

    <NotificationsSheetMenu
      v-model:open="notificationsMenuOpen"
      header-height="3rem"
      side="right"
    />

    <RouterView v-slot="{ Component }" >
      <LayoutTransition>
        <component :is="Component" />
      </LayoutTransition>
    </RouterView>
  </Layout>
</template>

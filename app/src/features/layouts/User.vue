<script setup lang="ts">
  import { ref } from 'vue'
  import { Layout, LayoutHeader } from '@shared/components/common/Layout'
  import { SheetMenu } from '@shared/components/common/SheetMenu'
  import AccountSheetMenu from '@shared/features/sheet-menus/Account.vue'
  import NotificationsSheetMenu from '@shared/features/sheet-menus/Notifications.vue'
  import HeaderNav from '@/features/navs/Header.vue'
  import AccountNav from '@/features/navs/Account.vue'
  import BookmarksNav from '@/features/navs/Bookmarks.vue'
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

    <SheetMenu
      v-model:open="bookmarksMenuOpen"
      :title="$t('features.sr.menu_bookmarks')"
      header-height="3rem"
      side="left"
    >
      <BookmarksNav />
    </SheetMenu>

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

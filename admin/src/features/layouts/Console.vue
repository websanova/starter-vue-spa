<script setup lang="ts">
  import { ref } from 'vue'
  import { useLogout } from '@shared/composables/support/logout'
  import { Layout, LayoutBody, LayoutBodyAside, LayoutBodyContent, LayoutHeader } from '@shared/components/common/Layout'
  import { SheetMenu } from '@shared/components/common/SheetMenu'
  import AccountSheetMenu from '@shared/features/sheet-menus/Account.vue'
  import HeaderNav from '@/features/navs/Header.vue'
  import ConsoleNav from '@/features/navs/Console.vue'
  import LogoNav from '@shared/features/navs/Logo.vue'
  import LayoutTransition from '@shared/features/transitions/Layout.vue'

  const consoleMenuOpen = ref(false)
  const accountMenuOpen = ref(false)

  const onLogout = useLogout()

  function onLogo() {
    consoleMenuOpen.value = true
  }
</script>

<template>
  <Layout header-height="3rem">
    <LayoutHeader size="full">
      <template #logo>
        <LogoNav
          :to="{ name: 'user-landing' }"
          @click="onLogo"
        />
      </template>

      <template #nav>
        <HeaderNav @account="accountMenuOpen = true" />
      </template>
    </LayoutHeader>

    <SheetMenu
      v-model:open="consoleMenuOpen"
      :title="$t('features.sr.menu_main')"
      header-height="3rem"
      side="left"
    >
      <ConsoleNav />
    </SheetMenu>

    <AccountSheetMenu
      v-model:open="accountMenuOpen"
      header-height="3rem"
      side="right"
      @logout="onLogout"
    />

    <LayoutBody size="full">
      <LayoutBodyAside
        class="sm:unhidden"
        side="left"
      >
        <ConsoleNav />
      </LayoutBodyAside>

      <LayoutBodyContent>
        <RouterView v-slot="{ Component }" >
          <LayoutTransition>
            <component :is="Component" />
          </LayoutTransition>
        </RouterView>
      </LayoutBodyContent>
    </LayoutBody>
  </Layout>
</template>

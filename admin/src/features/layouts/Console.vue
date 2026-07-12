<script setup lang="ts">
  import { ref } from 'vue'
  import { Layout, LayoutBody, LayoutBodyAside, LayoutBodyContent, LayoutHeader } from '@shared/components/common/Layout'
  import { SheetMenu } from '@shared/components/common/SheetMenu'
  import HeaderNav from '@/features/navs/Header.vue'
  import ConsoleNav from '@/features/navs/Console.vue'
  import LogoNav from '@shared/features/navs/Logo.vue'
  import LayoutTransition from '@shared/features/transitions/Layout.vue'

  const mobileMenuOpen = ref(false)

  function onLogo() {
    mobileMenuOpen.value = true
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
        <HeaderNav />
      </template>
    </LayoutHeader>

    <SheetMenu
      v-model:open="mobileMenuOpen"
      header-height="3rem"
      side="left"
    >
      <ConsoleNav />
    </SheetMenu>

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

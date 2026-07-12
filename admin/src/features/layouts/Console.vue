<script setup lang="ts">
  import { Layout, LayoutBody, LayoutBodyAside, LayoutBodyContent, LayoutHeader } from '@shared/components/common/Layout'
  import HeaderNav from '@/features/navs/Header.vue'
  import ConsoleNav from '@/features/navs/Console.vue'
  import LogoNav from '@shared/features/navs/Logo.vue'
  import LayoutTransition from '@shared/features/transitions/Layout.vue'

  function onLogo() {
    console.log('onLogo')
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

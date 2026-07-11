<script setup lang="ts">
  import { Layout, LayoutBody, LayoutBodyAside, LayoutBodyContent, LayoutHeader } from '@shared/components/common/Layout'
  import AsideNav from '@/features/navs/Aside.vue'
  import HeaderNav from '@/features/navs/Header.vue'
  import LogoNav from '@shared/features/navs/Logo.vue'
  import PageTransition from '@shared/features/transitions/Page.vue'

  function onLogo() {
    console.log('onLogo')
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
        <HeaderNav />
      </template>
    </LayoutHeader>

    <LayoutBody>
      <LayoutBodyAside side="left">
        <AsideNav />
      </LayoutBodyAside>

      <LayoutBodyContent>
        <RouterView v-slot="{ Component }" >
          <PageTransition>
            <component :is="Component" />
          </PageTransition>
        </RouterView>
      </LayoutBodyContent>
    </LayoutBody>
  </Layout>
</template>

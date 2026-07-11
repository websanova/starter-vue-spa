<script setup lang="ts">
  import { Layout, LayoutHeader } from '@shared/components/common/Layout'
  import HeaderNav from '@/features/navs/Header.vue'
  import LogoNav from '@shared/features/navs/Logo.vue'
  import LayoutTransition from '@shared/features/transitions/Layout.vue'

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

    <RouterView v-slot="{ Component }" >
      <LayoutTransition>
        <component :is="Component" />
      </LayoutTransition>
    </RouterView>
  </Layout>
</template>

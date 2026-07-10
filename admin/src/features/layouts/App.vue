<script setup lang="ts">
  import { Layout, LayoutBody, LayoutHeader } from '@shared/components/common/Layout'
  import LogoNav from '@shared/features/navs/Logo.vue'
  import PageTransition from '@shared/features/transitions/Page.vue'

  function onLogo() {
    console.log('onLogo')
  }
</script>

<template>
  <Layout header-height="3rem">
    <LayoutHeader fluid>
      <template #logo>
        <LogoNav
          :to="{ name: 'user-landing' }"
          @click="onLogo"
        />
      </template>
    </LayoutHeader>

    <LayoutBody fluid>
      <RouterView v-slot="{ Component }" >
        <PageTransition>
          <component :is="Component" />
        </PageTransition>
      </RouterView>
    </LayoutBody>
  </Layout>
</template>

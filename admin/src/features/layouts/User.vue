<script setup lang="ts">
  import { Layout, LayoutBody, LayoutBodyContent, LayoutHeader } from '@shared/components/common/Layout'
  import LogoNav from '@shared/features/navs/Logo.vue'
  import PageTransition from '@shared/features/transitions/Page.vue'

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
    </LayoutHeader>

    <LayoutBody size="full">
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

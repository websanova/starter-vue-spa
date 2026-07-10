<script setup lang="ts">
  import { Layout, LayoutBody, LayoutBodyContent } from '@shared/components/common/Layout'
  import LogoNav from '@shared/features/navs/Logo.vue'
  import PageTransition from '@shared/features/transitions/Page.vue'
</script>

<template>
  <Layout>
    <div class="fixed top-0 left-0 h-10 px-2">
      <LogoNav :to="{ name: 'auth-landing' }" />
    </div>

    <LayoutBody>
      <LayoutBodyContent centered>
        <RouterView v-slot="{ Component }">
          <PageTransition>
            <component :is="Component" />
          </PageTransition>
        </RouterView>
      </LayoutBodyContent>
    </LayoutBody>
  </Layout>
</template>

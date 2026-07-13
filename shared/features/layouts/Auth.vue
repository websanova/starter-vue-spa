<script setup lang="ts">
  import { Layout, LayoutBody, LayoutBodyContent } from '@shared/components/common/Layout'
  import DarkModeNav from '@shared/features/navs/DarkMode.vue'
  import LogoNav from '@shared/features/navs/Logo.vue'
  import PageTransition from '@shared/features/transitions/Page.vue'
</script>

<template>
  <Layout>
    <div class="fixed top-0 left-0 p-3">
      <LogoNav :to="{ name: 'auth-landing' }" />
    </div>

    <div class="fixed top-0 right-0 p-3">
      <DarkModeNav class="size-6" />
    </div>

    <LayoutBody>
      <LayoutBodyContent centered>
        <div class="mx-auto w-full max-w-xs">
          <RouterView v-slot="{ Component }">
            <PageTransition>
              <component :is="Component" />
            </PageTransition>
          </RouterView>
        </div>
      </LayoutBodyContent>
    </LayoutBody>
  </Layout>
</template>

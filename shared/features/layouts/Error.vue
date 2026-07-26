<script setup lang="ts">
  import { Layout, LayoutBody, LayoutBodyContent, LayoutHeader } from '@shared/components/common/Layout'
  import LogoNav from '@shared/features/navs/Logo.vue'
</script>

<template>
  <Layout header-height="3rem">
    <LayoutHeader>
      <template #logo>
        <LogoNav :to="{ name: 'auth-landing' }" />
      </template>
    </LayoutHeader>

    <LayoutBody>
      <LayoutBodyContent centered>
        <div class="mx-auto w-full max-w-xs">
          <RouterView />
        </div>
      </LayoutBodyContent>
    </LayoutBody>
  </Layout>
</template>

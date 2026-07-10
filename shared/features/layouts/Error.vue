<script setup lang="ts">
  import { Layout, LayoutBody, LayoutBodyContent, LayoutHeader } from '@shared/components/common/Layout'
  import LogoNav from '@shared/features/navs/Logo.vue'
</script>

<template>
  <Layout>
    <LayoutHeader>
      <template #logo>
        <LogoNav :to="{ name: 'auth-landing' }" />
      </template>
    </LayoutHeader>

    <LayoutBody>
      <LayoutBodyContent centered>
        <RouterView />
      </LayoutBodyContent>
    </LayoutBody>
  </Layout>
</template>

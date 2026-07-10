<script setup lang="ts">
  import { Layout, LayoutBodyCentered, LayoutHeader } from '@shared/components/common/Layout'
  import LogoNav from '@shared/features/navs/Logo.vue'
</script>

<template>
  <Layout>
    <LayoutHeader>
      <template #logo>
        <LogoNav :to="{ name: 'auth-landing' }" />
      </template>
    </LayoutHeader>

    <LayoutBodyCentered>
      <RouterView />
    </LayoutBodyCentered>
  </Layout>
</template>

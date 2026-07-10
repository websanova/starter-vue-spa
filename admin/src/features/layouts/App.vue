<script setup lang="ts">
  import { Body } from '@shared/components/common/Body'
  import { Header } from '@shared/components/common/Header'
  import LogoNav from '@shared/features/navs/Logo.vue'
  import PageTransition from '@shared/features/transitions/Page.vue'

  function onLogo() {
    console.log('onLogo')
  }
</script>

<template>
  <div
    class="min-h-screen flex flex-col"
    style="--app-header-h: 3.5rem; --app-footer-h: 0px"
  >
    <Header fluid>
      <template #logo>
        <LogoNav
          :to="{ name: 'user-landing' }"
          @click="onLogo"
        />
      </template>
    </Header>

    <Body fluid>
      <RouterView v-slot="{ Component }" >
        <PageTransition>
          <component :is="Component" />
        </PageTransition>
      </RouterView>
    </Body>
  </div>
</template>

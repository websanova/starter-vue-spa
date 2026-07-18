<script setup lang="ts">
  import { LayoutBody, LayoutBodyAside, LayoutBodyContent } from '@shared/components/common/Layout'
  import AccountNav from '@/features/navs/Account.vue'
  import PageTransition from '@shared/features/transitions/Page.vue'
</script>

<template>
  <LayoutBody>
    <LayoutBodyAside
      class="sm:unhidden"
      side="left"
    >
      <AccountNav />
    </LayoutBodyAside>

    <LayoutBodyContent class="pb-15">
      <RouterView v-slot="{ Component }" >
        <PageTransition>
          <component :is="Component" />
        </PageTransition>
      </RouterView>
    </LayoutBodyContent>
  </LayoutBody>
</template>

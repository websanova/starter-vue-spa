<script setup lang="ts">
  import LogoNav from '@shared/features/navs/Logo.vue'
  import PageTransition from '@shared/features/transitions/Page.vue'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="fixed top-0 left-0 h-10 px-2">
      <LogoNav :to="{ name: 'auth-landing' }" />
    </div>

    <div class="flex w-full max-w-sm flex-col items-center gap-4 p-8">
      <div class="w-full">
        <RouterView v-slot="{ Component }">
          <PageTransition>
            <component :is="Component" />
          </PageTransition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

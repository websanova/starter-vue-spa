<script setup lang="ts">
  import { Header } from '@shared/components/common/Header'
  import LogoNav from '@shared/features/navs/Logo.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header>
      <template #logo>
        <LogoNav :to="{ name: 'auth-landing' }" />
      </template>
    </Header>

    <main class="flex-1 flex items-center justify-center">
      <div class="flex w-full flex-col items-center justify-center gap-4 p-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>

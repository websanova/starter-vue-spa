<script setup lang="ts">
  import { Header } from '@shared/components/common/Header'
  import StarterLogo from '@shared/components/logos/Starter.vue'
  import StarterTextLogo from '@shared/components/logos/StarterText.vue'
</script>

<template>
  <div
    class="min-h-screen flex flex-col"
  >
    <Header>
      <template #logo>
        <RouterLink
          :to="{ name: 'auth-landing' }"
          class="flex items-center"
        >
          <StarterLogo
            class="h-6 sm:hidden"
          />

          <StarterTextLogo
            class="h-6 sm:unhidden"
          />
        </RouterLink>
      </template>
    </Header>

    <main
      class="flex-1 flex items-center justify-center"
    >
      <div
        class="flex w-full flex-col items-center justify-center gap-4 p-8"
      >
        <RouterView />
      </div>
    </main>
  </div>
</template>

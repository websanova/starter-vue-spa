<script setup lang="ts">
  import LayoutTransition from '@shared/features/transitions/Layout.vue'
  import StarterLogo from '@shared/components/logos/Starter.vue'
  import StarterTextLogo from '@shared/components/logos/StarterText.vue'
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center"
  >
    <RouterLink
      :to="{ name: 'auth-landing' }"
      class="fixed top-0 left-0 h-10 px-2 flex items-center"
    >
          <StarterLogo
            class="h-6 sm:hidden"
          />

          <StarterTextLogo
            class="h-6 hidden sm:unhidden"
          />
    </RouterLink>

    <div
      class="flex w-full max-w-sm flex-col items-center gap-4 p-8"
    >
      <div
        class="w-full"
      >
        <RouterView
          v-slot="{ Component }"
        >
          <LayoutTransition>
            <component
              :is="Component"
            />
          </LayoutTransition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

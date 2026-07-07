<script setup lang="ts">
  import StarterLogo from '@shared/components/logos/Starter.vue'
  import StarterTextLogo from "@shared/components/logos/StarterText.vue"
  import PageTransition from '@shared/features/transitions/Page.vue'

  defineProps<{
    height?: string
  }>()
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center"
  >
    <RouterLink
      :to="{ name: 'auth-landing' }"
      class="fixed top-0 left-0 h-10 px-4 flex items-center"
    >
      <StarterLogo
        class="h-6"
      />
    </RouterLink>

    <div
      class="flex w-full max-w-sm flex-col items-center gap-4 p-8"
    >
      <StarterTextLogo
        class="h-10"
      />

      <div
        :class="['w-full', height]"
      >
        <RouterView
          v-slot="{ Component }"
        >
          <PageTransition>
            <component
              :is="Component"
            />
          </PageTransition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

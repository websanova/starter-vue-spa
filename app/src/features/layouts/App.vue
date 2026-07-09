<script setup lang="ts">
  import { Body } from '@shared/components/common/Body'
  import { Header } from '@shared/components/common/Header'
  import StarterLogo from '@shared/components/logos/Starter.vue'
  import StarterTextLogo from '@shared/components/logos/StarterText.vue'
  import PageTransition from '@shared/features/transitions/Page.vue'

  function onLogo() {
    console.log('onLogo')
  }
</script>

<template>
  <div
    class="min-h-screen flex flex-col"
  >
    <Header>
      <template #logo>
        <RouterLink
          :to="{ name: 'user-landing' }"
          class="flex h-full items-center sm:unhidden"
        >
          <StarterTextLogo
            class="h-6"
          />
        </RouterLink>

        <div
          class="flex h-full items-center sm:hidden cursor-pointer"
          @click="onLogo"
        >
          <StarterLogo
            class="h-6"
          />
        </div>
      </template>
    </Header>

    <Body>
      <RouterView
        v-slot="{ Component }"
      >
        <PageTransition>
          <component
            :is="Component"
          />
        </PageTransition>
      </RouterView>
    </Body>
  </div>
</template>

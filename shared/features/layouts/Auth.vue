<script setup lang="ts">
  import { Layout, LayoutBody, LayoutBodyContent } from '@shared/components/common/Layout'
  import { Navbar, NavItem } from '@shared/components/common/Navbar'
  import AuthNav from '@shared/features/navs/Auth.vue'
  import PageTransition from '@shared/features/transitions/Page.vue'
  import StarterTextLogo from '@shared/components/logos/StarterText.vue'
</script>

<template>
  <Layout>
    <!--
      These corners manually match the app header dimensions (height, padding,
      bottom border) so the logo sits in the same position across layouts. The
      border is transparent here but still consumes the 1px the real header
      border-box eats, otherwise the logo would shift.
    -->
    <div class="fixed top-0 left-0 px-3 flex items-center h-[3rem] border-b border-transparent">
      <Navbar>
        <NavItem
          :to="{ name: 'auth-landing' }"
          class="[&>svg]:!w-auto"
        >
          <StarterTextLogo />
        </NavItem>
      </Navbar>
    </div>

    <div class="fixed top-0 right-0 px-3 flex items-center h-[3rem] border-b border-transparent">
      <AuthNav />
    </div>

    <LayoutBody>
      <LayoutBodyContent centered>
        <div class="mx-auto w-full max-w-xs">
          <RouterView v-slot="{ Component }">
            <PageTransition>
              <component :is="Component" />
            </PageTransition>
          </RouterView>
        </div>
      </LayoutBodyContent>
    </LayoutBody>
  </Layout>
</template>

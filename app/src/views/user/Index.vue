<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center"
  >
    <div
      class="text-center"
    >
      <Heading>
        User Index
      </Heading>
      <nav
        class="flex flex-wrap gap-4 justify-center mb-4"
      >
        <RouterLink
          :to="{ name: 'user-todos' }"
        >Todos</RouterLink>
        <RouterLink
          :to="{ name: 'user-account' }"
        >Account</RouterLink>
        <RouterLink
          :to="{ name: 'user-billing' }"
        >Billing</RouterLink>
        <RouterLink
          :to="{ name: 'user-payment-info' }"
        >Payment Info</RouterLink>
        <RouterLink
          :to="{ name: 'user-plans' }"
        >Plans</RouterLink>
        <RouterLink
          :to="{ name: 'user-settings' }"
        >Settings</RouterLink>
        <RouterLink
          :to="{ name: 'user-subscribe' }"
        >Subscribe</RouterLink>
        <RouterLink
          :to="{ name: 'user-unsubscribe' }"
        >Unsubscribe</RouterLink>
      </nav>
      <hr class="mb-4">
      <RouterView />
    </div>
  </div>
</template>

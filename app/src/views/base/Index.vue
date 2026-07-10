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
        Base Index
      </Heading>
      <nav
        class="flex flex-wrap gap-4 justify-center mb-4"
      >
        <RouterLink
          :to="{ name: 'base-pp' }"
        >Privacy Policy</RouterLink>
        <RouterLink
          :to="{ name: 'base-tos' }"
        >Terms Of Service</RouterLink>
      </nav>
      <hr class="mb-4">
      <RouterView />
    </div>
  </div>
</template>

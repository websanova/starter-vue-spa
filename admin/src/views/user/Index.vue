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
          :to="{ name: 'user-users' }"
        >Users</RouterLink>
        <RouterLink
          :to="{ name: 'user-plans' }"
        >Plans</RouterLink>
        <RouterLink
          :to="{ name: 'user-icons' }"
        >Icons</RouterLink>
      </nav>
      <hr class="mb-4">
      <RouterView />
    </div>
  </div>
</template>

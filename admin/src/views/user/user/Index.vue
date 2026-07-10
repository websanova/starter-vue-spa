<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
</script>

<template>
  <div>
    <Heading>
      User User Index
    </Heading>
    <nav
      class="flex flex-wrap gap-4 justify-center mb-4"
    >
      <RouterLink
        to="edit"
      >Edit</RouterLink>
      <RouterLink
        to="info"
      >Info</RouterLink>
      <RouterLink
        to="billing"
      >Billing</RouterLink>
    </nav>
    <hr class="mb-4">
    <RouterView />
  </div>
</template>

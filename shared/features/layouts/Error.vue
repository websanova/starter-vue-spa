<script setup lang="ts">
  import { Header } from '@shared/components/common/Header'
</script>

<template>
  <div
    class="min-h-screen flex flex-col"
  >
    <Header>Hello</Header>

    <main
      class="flex-1 flex items-center justify-center"
    >
      <div
        class="flex w-full max-w-sm flex-col items-center gap-4 p-8"
      >
        <RouterView />
      </div>
    </main>
  </div>
</template>

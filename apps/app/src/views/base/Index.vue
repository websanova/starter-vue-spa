<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Base Index</h1>
      <nav class="flex flex-wrap gap-4 justify-center mb-4">
        <RouterLink :to="{ name: 'base-pp' }">Privacy Policy</RouterLink>
        <RouterLink :to="{ name: 'base-tos' }">Terms Of Service</RouterLink>
      </nav>
      <hr class="mb-4">
      <RouterView />
    </div>
  </div>
</template>

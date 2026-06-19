<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Auth Index</h1>
      <nav class="flex flex-wrap gap-4 justify-center mb-4">
        <RouterLink :to="{ name: 'auth-login' }">Login</RouterLink>
      </nav>
      <hr class="mb-4">
      <RouterView />
    </div>
  </div>
</template>

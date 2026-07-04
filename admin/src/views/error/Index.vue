<template>
  <div
    class="flex min-h-screen items-center justify-center"
  >
    <div
      class="text-center"
    >
      <h1
        class="text-2xl font-bold mb-4"
      >Error Index</h1>
      <nav
        class="flex flex-wrap gap-4 justify-center mb-4"
      >
        <RouterLink
          :to="{ name: 'error-403' }"
        >Forbidden</RouterLink>
        <RouterLink
          :to="{ name: 'error-404', params: { catchAll: 'not-found' } }"
        >Not Found</RouterLink>
      </nav>
      <hr
        class="mb-4"
      >
      <RouterView />
    </div>
  </div>
</template>

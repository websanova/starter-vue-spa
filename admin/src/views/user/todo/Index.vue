<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">User Todo Index</h1>
    <nav class="flex flex-wrap gap-4 justify-center mb-4">
      <RouterLink to="info">Info</RouterLink>
      <RouterLink to="tasks">Tasks</RouterLink>
    </nav>
    <hr class="mb-4">
    <RouterView />
  </div>
</template>

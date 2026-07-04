<template>
  <div
    class="flex min-h-screen items-center justify-center"
  >
    <div
      class="text-center"
    >
      <h1
        class="text-2xl font-bold mb-4"
      >User Index</h1>
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
      <hr
        class="mb-4"
      >
      <RouterView />
    </div>
  </div>
</template>

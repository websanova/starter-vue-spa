<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">User Index</h1>
      <nav class="flex flex-wrap gap-4 justify-center mb-4">
        <RouterLink :to="{ name: 'user-todos' }">Todos</RouterLink>
        <RouterLink :to="{ name: 'user-account' }">Account</RouterLink>
        <RouterLink :to="{ name: 'user-billing' }">Billing</RouterLink>
        <RouterLink :to="{ name: 'user-payment-info' }">Payment Info</RouterLink>
        <RouterLink :to="{ name: 'user-plans' }">Plans</RouterLink>
        <RouterLink :to="{ name: 'user-settings' }">Settings</RouterLink>
        <RouterLink :to="{ name: 'user-subscribe' }">Subscribe</RouterLink>
        <RouterLink :to="{ name: 'user-unsubscribe' }">Unsubscribe</RouterLink>
      </nav>
      <hr class="mb-4">
      <RouterView />
    </div>
  </div>
</template>

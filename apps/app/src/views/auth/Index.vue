<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Auth Index</h1>
      <nav class="flex flex-wrap gap-4 justify-center mb-4">
        <RouterLink :to="{ name: 'auth-login' }">Login</RouterLink>
        <RouterLink :to="{ name: 'auth-register' }">Register</RouterLink>
        <RouterLink :to="{ name: 'auth-impersonate' }">Impersonate</RouterLink>
        <RouterLink :to="{ name: 'auth-password-reset-send' }">Password Reset Send</RouterLink>
        <RouterLink :to="{ name: 'auth-password-reset-update' }">Password Reset Update</RouterLink>
        <RouterLink :to="{ name: 'auth-unsubscribe' }">Unsubscribe</RouterLink>
        <RouterLink :to="{ name: 'auth-verification-confirm' }">Verification Confirm</RouterLink>
        <RouterLink :to="{ name: 'auth-verification-resend' }">Verification Resend</RouterLink>
      </nav>
      <hr class="mb-4">
      <RouterView />
    </div>
  </div>
</template>

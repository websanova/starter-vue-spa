<script setup lang="ts">
  import LoginForm from '@/features/forms/Login.vue'
</script>

<template>
  <div
    class="flex w-full flex-col gap-4"
  >
    <h1
      class="capitalize text-center text-2xl font-bold"
    >
      {{ $t('features.lbl.sign_in') }}
    </h1>

    <LoginForm />
  </div>
</template>

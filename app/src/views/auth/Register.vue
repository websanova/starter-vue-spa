<script setup lang="ts">
  import RegisterForm from '@/features/forms/Register.vue'
</script>

<template>
  <div
    class="flex w-full flex-col gap-4"
  >
    <h1
      class="capitalize text-center text-2xl font-bold"
    >
      {{ $t('features.lbl.sign_up') }}
    </h1>

    <RegisterForm />
  </div>
</template>

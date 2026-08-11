<script setup lang="ts">
  import AuthLoginForm from '@/features/forms/AuthLogin.vue'
  import { Heading } from '@shared/components/common/Heading'
</script>

<template>
  <div
    class="flex w-full flex-col gap-4"
  >
    <Heading
      class="capitalize text-center"
      :divider="false"
    >
      {{ $t('features.heading.sign_in') }}
    </Heading>

    <AuthLoginForm />
  </div>
</template>

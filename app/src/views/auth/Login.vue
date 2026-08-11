<script setup lang="ts">
  import AuthLoginForm from '@/features/forms/AuthLogin.vue'
  import { Heading } from '@shared/components/common/Heading'
</script>

<template>
  <div
    class="flex w-full flex-col"
  >
    <Heading
      class="text-center"
      :divider="false"
    >
      {{ $t('features.heading.login') }}
    </Heading>

    <AuthLoginForm />
  </div>
</template>

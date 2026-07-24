<script setup lang="ts">
  import AuthPasswordForgotForm from '@/features/forms/AuthPasswordForgot.vue'
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
      {{ $t('features.headings.password_reset') }}
    </Heading>

    <AuthPasswordForgotForm />
  </div>
</template>

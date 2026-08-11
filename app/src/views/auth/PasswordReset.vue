<script setup lang="ts">
  import AuthPasswordResetForm from '@/features/forms/AuthPasswordReset.vue'
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
      {{ $t('features.heading.password_update') }}
    </Heading>

    <AuthPasswordResetForm />
  </div>
</template>

<script setup lang="ts">
  import AuthPasswordResetForm from '@/features/forms/AuthPasswordReset.vue'
  import { Heading } from '@shared/components/common/Heading'
</script>

<template>
  <div
    class="flex w-full flex-col gap-4"
  >
    <Heading
      class="text-center"
      :divider="false"
    >
      {{ $t('features.headings.password_update') }}
    </Heading>

    <AuthPasswordResetForm />
  </div>
</template>

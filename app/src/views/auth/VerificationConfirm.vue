<script setup lang="ts">
  import AuthVerificationConfirmForm from '@/features/forms/AuthVerificationConfirm.vue'
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
      {{ $t('features.headings.verification_confirm') }}
    </Heading>

    <AuthVerificationConfirmForm />
  </div>
</template>

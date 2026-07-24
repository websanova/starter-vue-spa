<script setup lang="ts">
  import AuthVerificationConfirmForm from '@/features/forms/AuthVerificationConfirm.vue'
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
      {{ $t('features.lbl.confirm_verification') }}
    </Heading>

    <AuthVerificationConfirmForm />
  </div>
</template>

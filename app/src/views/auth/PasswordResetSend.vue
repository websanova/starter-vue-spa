<script setup lang="ts">
  import AuthPasswordResetSendForm from '@/features/forms/AuthPasswordResetSend.vue'
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
      {{ $t('features.lbl.password_reset') }}
    </Heading>

    <AuthPasswordResetSendForm />
  </div>
</template>

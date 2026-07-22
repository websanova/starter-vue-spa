<script setup lang="ts">
  import AuthPasswordResetForm from '@/features/forms/AuthPasswordReset.vue'
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
      {{ $t('features.lbl.update_password') }}
    </Heading>

    <AuthPasswordResetForm />
  </div>
</template>

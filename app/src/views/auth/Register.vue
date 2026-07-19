<script setup lang="ts">
  import AuthRegisterForm from '@/features/forms/AuthRegister.vue'
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
      {{ $t('features.lbl.sign_up') }}
    </Heading>

    <AuthRegisterForm />
  </div>
</template>

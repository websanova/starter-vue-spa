<script setup lang="ts">
  import LoginForm from '@/features/forms/Login.vue'
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
      {{ $t('features.lbl.sign_in') }}
    </Heading>

    <LoginForm />
  </div>
</template>

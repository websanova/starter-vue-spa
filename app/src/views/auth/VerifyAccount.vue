<script setup lang="ts">
  import AuthVerifyAccountForm from '@/features/forms/AuthVerifyAccount.vue'
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
      {{ $t('features.headings.verify_account') }}
    </Heading>

    <AuthVerifyAccountForm />
  </div>
</template>

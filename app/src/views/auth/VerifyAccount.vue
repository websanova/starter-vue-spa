<script setup lang="ts">
  import { useVerifyChannel } from '@/composables/support/verifyChannel'
  import AuthVerifyAccountForm from '@/features/forms/AuthVerifyAccount.vue'
  import { Heading } from '@shared/components/common/Heading'

  const { channel } = useVerifyChannel()
</script>

<template>
  <div
    class="flex w-full flex-col"
  >
    <Heading
      class="text-center"
      :divider="false"
    >
      {{ $t(`features.heading.verify_${channel}`) }}
    </Heading>

    <AuthVerifyAccountForm />
  </div>
</template>

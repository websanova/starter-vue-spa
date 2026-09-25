<script setup lang="ts">
  import { useVerifyChannel } from '@/composables/support/useVerifyChannel'
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
      {{ $t(`features.heading.title.verify_${channel}`) }}
    </Heading>

    <AuthVerifyAccountForm />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useBillingAddressForm } from '@/composables/support/billingAddress'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Loading } from '@shared/components/common/Loading'
  import { Stack } from '@shared/components/common/Stack'

  const target = ref<HTMLElement | null>(null)

  const { error, isComplete, isLoading, isPending, submit } = useBillingAddressForm({ target })
</script>

<template>
  <Loading
    v-if="isLoading"
    class="justify-center"
  />

  <!--
    Hidden rather than removed. The element is mounted into this target
    before the loading state drops, and taking it out of the document
    tears the mount down.
  -->
  <Stack v-show="!isLoading">
    <p
      v-if="error"
      class="text-center text-destructive"
    >
      {{ error }}
    </p>

    <div ref="target" />

    <ButtonLoading
      class="w-full"
      :disabled="!isComplete"
      :pending="isPending"
      @click="submit"
    >
      {{ $t('features.lbl.update') }}
    </ButtonLoading>
  </Stack>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useBillingAddressForm } from '@/composables/support/billingAddress'
  import { Form, FormButton } from '@shared/components/common/Form'
  import { Loading } from '@shared/components/common/Loading'

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
  <Form
    v-show="!isLoading"
    @submit="submit"
  >
    <p
      v-if="error"
      class="text-center text-destructive"
    >
      {{ error }}
    </p>

    <div ref="target" />

    <FormButton
      :disabled="!isComplete"
      :pending="isPending"
    >
      {{ $t('features.lbl.update') }}
    </FormButton>
  </Form>
</template>

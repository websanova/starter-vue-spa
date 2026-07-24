<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useVerificationConfirm, useVerificationResend } from '@/composables/api/verification'
  import { useMutationError } from '@shared/composables/primitives/useMutationError'
  import { useLogout } from '@shared/composables/support/logout'
  import { useSettingsStore } from '@shared/stores/settings'
  import { Button } from '@shared/components/ui/button'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Form, FormButton } from '@shared/components/common/Form'
  import { InputOTP, InputOTPGroup, InputOTPSlot } from '@shared/components/ui/input-otp'

  const router = useRouter()
  const settings = useSettingsStore()
  const onLogout = useLogout()
  const verificationConfirm = useVerificationConfirm()
  const verificationResend = useVerificationResend()

  const code = ref('')
  const error = useMutationError(verificationConfirm, verificationResend)
  const length = computed(() => settings.data.verificationCodeLength)

  function onVerify() {
    verificationResend.reset()
    verificationConfirm.mutate({ code: code.value }, {
      onSuccess: () => router.push({ name: 'user-landing' }),
    })
  }

  function onResend() {
    verificationConfirm.reset()
    verificationResend.mutate()
  }

  onMounted(() => {
    // Auto send on mount, silently. Reset on error so the throttle
    // message from a remount never displays.
    verificationResend.mutate(undefined, {
      onError: () => verificationResend.reset(),
    })
  })
</script>

<template>
  <Form @submit="onVerify">
    <p class="text-center">
      {{ $t('features.form.verification_confirm.note') }}
    </p>

    <div class="flex justify-center">
      <InputOTP
        v-model="code"
        :maxlength="length"
      >
        <InputOTPGroup
            v-for="i in length"
            :key="i"
        >
          <InputOTPSlot :index="i - 1" />
        </InputOTPGroup>
      </InputOTP>
    </div>

    <p
      v-if="error"
      class="text-center text-sm text-destructive"
    >
      {{ error }}
    </p>

    <FormButton
      class="w-full"
      :pending="verificationConfirm.isPending.value"
    >
      {{ $t('features.lbl.verify') }}
    </FormButton>

    <p class="self-end text-sm text-muted-foreground">
      <ButtonLoading
        class="h-auto p-0 text-link"
        :pending="verificationResend.isPending.value"
        variant="link"
        @click="onResend()"
      >
        {{ $t('features.form.verification_confirm.resend_code') }}
      </ButtonLoading>

      |

      <Button
        class="h-auto p-0 text-link"
        variant="link"
        @click="onLogout"
      >
        {{ $t('features.lbl.sign_out') }}
      </Button>
    </p>
  </Form>
</template>

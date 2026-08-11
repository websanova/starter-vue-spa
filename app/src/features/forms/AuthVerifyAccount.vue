<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useVerificationConfirm, useVerificationResend } from '@/composables/api/verification'
  import { useVerifyChannel } from '@/composables/support/verifyChannel'
  import { useMutationError } from '@shared/composables/primitives/useMutationError'
  import { useAuthService } from '@shared/composables/services/auth'
  import { useLogout } from '@shared/composables/support/logout'
  import { useSettingsStore } from '@shared/stores/settings'
  import { Button } from '@shared/components/ui/button'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Form, FormButton } from '@shared/components/common/Form'
  import { InputOTP, InputOTPGroup, InputOTPSlot } from '@shared/components/ui/input-otp'

  const router = useRouter()
  const auth = useAuthService()
  const settings = useSettingsStore()
  const onLogout = useLogout()
  const verificationConfirm = useVerificationConfirm()
  const verificationResend = useVerificationResend()

  const { channel } = useVerifyChannel()

  const code = ref('')
  const error = useMutationError(verificationConfirm, verificationResend)
  const length = computed(() => settings.data.verificationCodeLength)
  const digits = computed(() => auth.user.value?.phone?.slice(-2) ?? '')

  function onVerify() {
    verificationResend.reset()
    verificationConfirm.mutate({ code: code.value, channel: channel.value }, {
      onSuccess: () => {
        if (!auth.user.value?.isVerificationRequired) {
          router.push({ name: 'user-landing' })
        }
      },
    })
  }

  function onResend() {
    verificationConfirm.reset()
    verificationResend.mutate({ channel: channel.value })
  }

  // Send a code whenever the active channel resolves or advances. Silent,
  // resetting on error so a throttle message never displays on its own.
  watch(channel, (value) => {
    if (!value) return
    code.value = ''
    verificationResend.mutate({ channel: value }, {
      onError: () => verificationResend.reset(),
    })
  }, { immediate: true })
</script>

<template>
  <Form @submit="onVerify">
    <p class="text-center">
      {{ $t(`features.form.auth_verify_account.note_${channel}`, { digits }) }}
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
        {{ $t('features.form.auth_verify_account.resend_code') }}
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

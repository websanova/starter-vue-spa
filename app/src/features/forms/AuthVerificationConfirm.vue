<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useVerificationResend } from '@/composables/api/verification'
  import { useLogout } from '@shared/composables/support/logout'
  import { useSettingsStore } from '@shared/stores/settings'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Form, FormButton } from '@shared/components/common/Form'
  import { InputOTP, InputOTPGroup, InputOTPSlot } from '@shared/components/ui/input-otp'
  import { HttpError } from '@shared/plugins/http/client'

  const settings = useSettingsStore()
  const onLogout = useLogout()
  const verificationResend = useVerificationResend()

  const length = computed(() => settings.data.verificationCodeLength)
  const code = ref('')
  const resendError = ref('')

  async function onResend(silent = false) {
    resendError.value = ''

    try {
      await verificationResend.mutateAsync()
    } catch (err) {
      if (err instanceof HttpError && err.response.status === 429) {
        if (!silent) {
          resendError.value = (err.response.data as { message: string }).message
        }
        return
      }
      throw err
    }
  }

  onMounted(() => onResend(true))
</script>

<template>
  <Form>
    <div class="flex flex-col gap-4">
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
        v-if="resendError"
        class="text-center text-sm text-destructive"
      >
        {{ resendError }}
      </p>

      <FormButton class="w-full">
        {{ $t('features.lbl.verify') }}
      </FormButton>

      <p class="self-end text-sm text-muted-foreground">
        <ButtonLoading
          :pending="verificationResend.isPending.value"
          variant="link"
          class="h-auto p-0 text-link"
          @click="onResend()"
        >
          {{ $t('features.form.verification_confirm.resend_code') }}
        </ButtonLoading>

        |

        <button
          type="button"
          class="text-link"
          @click="onLogout"
        >
          {{ $t('features.lbl.sign_out') }}
        </button>
      </p>
    </div>
  </Form>
</template>

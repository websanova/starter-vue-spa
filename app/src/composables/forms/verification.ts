import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVerificationConfirm, useVerificationResend } from '@/composables/api/verification'
import { useVerifyChannel } from '@/composables/current/useVerifyChannel'
import { useMutationError } from '@shared/composables/primitives/useMutationError'
import { useAuthService } from '@shared/composables/services/useAuthService'
import { getRedirect } from '@shared/lib/redirect'

export function useVerificationForm() {
  const route = useRoute()
  const router = useRouter()
  const auth = useAuthService()
  const verificationConfirm = useVerificationConfirm()
  const verificationResend = useVerificationResend()

  const { channel } = useVerifyChannel()

  const code = ref('')
  const error = useMutationError([verificationConfirm, verificationResend])

  function submit() {
    verificationResend.reset()
    verificationConfirm.mutate({ code: code.value, channel: channel.value }, {
      onSuccess: () => {
        if (!auth.user.value?.isVerificationRequired) {
          router.push(getRedirect(route.query) ?? { name: 'user-landing' })
        }
      },
    })
  }

  function resend() {
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

  return {
    channel,
    code,
    error,
    isPending: verificationConfirm.isPending,
    isResending: verificationResend.isPending,
    resend,
    submit,
  }
}

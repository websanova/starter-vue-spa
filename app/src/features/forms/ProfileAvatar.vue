<script setup lang="ts">
  import { useAuthService } from '@shared/composables/services/auth'
  import { useDeleteAvatar } from '@/composables/api/profile'
  import { useProfileAvatar } from '@/composables/forms/profile'
  import { ButtonLoading } from '@shared/components/common/ButtonLoading'
  import { Form } from '@shared/components/common/Form'
  import { Inline } from '@shared/components/common/Inline'
  import AccountAvatar from '@shared/features/avatars/Account.vue'

  const { user } = useAuthService()
  const { open, isPending, error, sizeLabel, formatsLabel } = useProfileAvatar()
  const { mutate: remove, isPending: isRemoving } = useDeleteAvatar()
</script>

<template>
  <Form>
    <div class="flex flex-col gap-3 sm:flex-row">
      <AccountAvatar class="size-16 text-2xl shrink-0" />

      <p class="flex-1 min-w-0 text-sm text-muted-foreground">
        {{ $t('features.form.avatar.note', [sizeLabel, formatsLabel]) }}
      </p>
    </div>

    <Inline>
      <ButtonLoading
        :pending="isPending"
        :disabled="isRemoving"
        @click="open()"
      >
        {{ $t('features.lbl.upload') }}
      </ButtonLoading>

      <ButtonLoading
        v-if="user?.isAvatar"
        variant="outline"
        color="destructive"
        :pending="isRemoving"
        :disabled="isPending"
        @click="remove()"
      >
        {{ $t('features.lbl.remove') }}
      </ButtonLoading>
    </Inline>
  </Form>
</template>

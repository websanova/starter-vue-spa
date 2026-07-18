<script setup lang="ts">
  import { useAuth } from '@shared/composables/services/auth'
  import { useDeleteAvatar } from '@/composables/api/profile'
  import { useProfileAvatar } from '@/composables/forms/profile'
  // import { Avatar, AvatarFallback, AvatarImage } from '@shared/components/ui/avatar'
  import { Form } from '@shared/components/common/Form'
  import { Inline } from '@shared/components/common/Inline'
  import AccountAvatar from '@shared/features/avatars/Account.vue'
  import { Button } from '@shared/components/ui/button'

  const { user } = useAuth()
  const { open, isPending, error } = useProfileAvatar()
  const { mutate: remove, isPending: isRemoving } = useDeleteAvatar()
</script>

<template>
  <Form>
    <div class="flex flex-col gap-3 sm:flex-row">
      <AccountAvatar class="size-16 text-2xl shrink-0" />

      <p class="flex-1 min-w-0 text-sm text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>

    <Inline>
      <Button
        :disabled="isPending"
        @click="open()"
      >
        {{ $t('features.lbl.upload') }}
      </Button>

      <Button
        v-if="user?.isAvatar"
        variant="outline"
        color="destructive"
        :disabled="isRemoving"
        @click="remove()"
      >
        {{ $t('features.lbl.remove') }}
      </Button>
    </Inline>
  </Form>
</template>

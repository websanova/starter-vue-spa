<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import ProfileAvatarForm from '@/features/forms/ProfileAvatar.vue'
  import UserEditForm from '@/features/forms/UserEdit.vue'
</script>

<template>
  <div>
    <Heading>
      {{ $t('features.lbl.profile') }}
    </Heading>

    <ProfileAvatarForm />

    <UserEditForm />
  </div>
</template>

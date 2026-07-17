<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import ProfileAvatarForm from '@/features/forms/ProfileAvatar.vue'
  import ProfileEditForm from '@/features/forms/ProfileEdit.vue'
</script>

<template>
  <div>
    <Heading>
      {{ $t('features.lbl.profile') }}
    </Heading>

    <ProfileAvatarForm />

    <ProfileEditForm />
  </div>
</template>

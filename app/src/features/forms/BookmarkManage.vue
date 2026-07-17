<script setup lang="ts">
  import { useBookmarkForm } from '@/composables/forms/bookmark'
  import { Form, FormButton, FormInputText } from '@shared/components/common/Form'
  import type { Bookmark } from '@/models/bookmark'

  const props = defineProps<{
    bookmark?: Bookmark
  }>()

  const { submit, isPending } = useBookmarkForm(props.bookmark)
</script>

<template>
  <Form @submit="submit">
    <FormInputText
      name="title"
      :label="$t('features.lbl.title')"
    />

    <FormInputText
      name="url"
      :label="$t('features.lbl.url')"
    />

    <FormButton :pending="isPending">
      {{ $t(bookmark ? 'features.lbl.update' : 'features.lbl.create') }}
    </FormButton>
  </Form>
</template>

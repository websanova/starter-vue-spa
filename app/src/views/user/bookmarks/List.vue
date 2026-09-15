<script setup lang="ts">
  import { Heading } from '@shared/components/common/Heading'
  import BookmarksList from '@/features/lists/Bookmarks.vue'
</script>

<template>
  <section>
    <Heading>
      {{ $t('features.lbl.bookmarks') }}
    </Heading>

    <BookmarksList />
  </section>
</template>
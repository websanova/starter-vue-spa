<script setup lang="ts">
  import { computed } from 'vue'
  import { useHead } from '@unhead/vue'
  import { Head } from '@unhead/vue/components'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const i18n = useI18n()

  useHead({
    titleTemplate: i18n.t('site.name') + ' | %s',
  })

  function metaText(key: string) {
    return computed(() => {
      if (typeof route.name !== 'string') {
        return ''
      }

      const i18nKey = `site.${key}.${route.name}`

      return i18n.te(i18nKey) ? i18n.t(i18nKey) : ''
    })
  }

  const title = metaText('meta.title')
  const description = metaText('meta.description')
  const keywords = metaText('meta.keywords')
</script>

<template>
  <Head>
    <title>{{ title }}</title>
    <meta name="description" :content="description" />
    <meta name="keywords" :content="keywords" />
  </Head>
</template>

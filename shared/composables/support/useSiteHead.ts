import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

function useSiteHead() {
  const route = useRoute()
  const i18n = useI18n()

  function metaText(key: string) {
    return computed(() => {
      if (typeof route.name !== 'string') {
        return null
      }

      const i18nKey = `site.${key}.${route.name}`

      return i18n.te(i18nKey) ? i18n.t(i18nKey) : null
    })
  }

  const pageTitle = metaText('meta.title')
  const description = metaText('meta.description')
  const keywords = metaText('meta.keywords')

  const title = computed(() => (pageTitle.value ? `${i18n.t('site.name')} | ${pageTitle.value}` : null))

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
    ],
  })
}

export { useSiteHead }

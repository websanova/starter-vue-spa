import { reactive, ref } from 'vue'

import { defineStore } from 'pinia'

export type I18nTier = 'layout' | 'page' | 'site'

export const useI18nStore = defineStore('i18n', () => {
  const isLayoutLoaded = ref<boolean>(false)
  const isPageLoaded = ref<boolean>(false)
  const isSiteLoaded = ref<boolean>(false)

  const localesLoaded = reactive<Record<I18nTier, Record<string, Record<string, boolean>>>>({
    layout: {},
    page: {},
    site: {},
  })

  return {
    isLayoutLoaded,
    isPageLoaded,
    isSiteLoaded,
    localesLoaded,
  }
})

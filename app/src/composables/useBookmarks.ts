import { storeToRefs } from "pinia"
import { useApi } from "@shared/composables/useApi"
import { bookmarksApi } from "@shared/services/bookmarks"
import type { Bookmark, BookmarkQuery } from "@shared/types/bookmark"
import { useBookmarksStore } from "@/stores/bookmarks"

/**
* Orchestrates the bookmark resource. Wires the service to the store and
* exposes intent to views. No HTTP here (that is the service) and no persisted
* state here (that is the store). Each operation carries its own loading flag.
*/
export function useBookmarks() {
  const store = useBookmarksStore()
  const { items, loaded } = storeToRefs(store)

  const index = useApi(bookmarksApi.list)
  const show = useApi(bookmarksApi.get)
  const destroy = useApi(bookmarksApi.remove)
  const favorite = useApi(bookmarksApi.favorite)

  async function load(params?: BookmarkQuery, force = false) {
    if (loaded.value && !force) return items.value
    const data = await index.execute(params)
    store.setItems(data)
    return data
  }

  async function remove(id: number) {
    await destroy.execute(id)
    store.removeItem(id)
  }

  async function toggleFavorite(bookmark: Bookmark) {
    const next = !bookmark.favorited
    store.updateItem(bookmark.id, { favorited: next })

    try {
      await favorite.execute(bookmark.id, next)
    } catch (e) {
      store.updateItem(bookmark.id, { favorited: !next })
      throw e
    }
  }

  return {
    items,
    load,
    loading: index.loading,
    show: show.execute,
    showing: show.loading,
    remove,
    removing: destroy.loading,
    toggleFavorite
  }
}

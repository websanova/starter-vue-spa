import { storeToRefs } from "pinia"
import { useApi } from "@core/composables/useApi"
import { bookmarksApi } from "../api/bookmarks"
import type { BookmarkQuery } from "../types"
import { useBookmarksStore } from "./store"

/**
* Orchestrates the admin bookmark resource. Wires the service to the store and
* exposes intent to views. No favorite action here; favoriting is a user
* concern, the admin side manages and moderates.
*/
export function useBookmarks() {
  const store = useBookmarksStore()
  const { items, loaded } = storeToRefs(store)

  const index = useApi(bookmarksApi.list)
  const show = useApi(bookmarksApi.get)
  const destroy = useApi(bookmarksApi.remove)

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

  return {
    items,
    load,
    loading: index.loading,
    show: show.execute,
    showing: show.loading,
    remove,
    removing: destroy.loading
  }
}

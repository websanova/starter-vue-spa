// import { ref, computed } from "vue"
// import { defineStore } from "pinia"
// import type { Bookmark } from "../types"

// /**
// * Persisted admin bookmark state. Pure state container, no HTTP. Holds the
// * cached list, exposes derived getters, and provides dumb mutations the
// * composable drives.
// */
// export const useBookmarksStore = defineStore("admin-bookmarks", () => {
//   const items = ref<Bookmark[]>([])
//   const loaded = ref(false)
//   const fetchedAt = ref(0)

//   const byId = computed(() => (id: number) => items.value.find((b) => b.id === id))

//   function setItems(next: Bookmark[]) {
//     items.value = next
//     loaded.value = true
//     fetchedAt.value = Date.now()
//   }

//   function removeItem(id: number) {
//     items.value = items.value.filter((b) => b.id !== id)
//   }

//   function updateItem(id: number, patch: Partial<Bookmark>) {
//     const item = items.value.find((b) => b.id === id)
//     if (item) Object.assign(item, patch)
//   }

//   function reset() {
//     items.value = []
//     loaded.value = false
//     fetchedAt.value = 0
//   }

//   return { items, loaded, fetchedAt, byId, setItems, removeItem, updateItem, reset }
// })

// // src/composables/usePolling.js
// import { onMounted, onUnmounted, ref } from 'vue'

// export function usePolling(queryComposable, options = { interval: 5000 }) {
//   let timerId = null
//   const isPolling = ref(false)

//   const start = () => {
//     if (timerId) return
//     isPolling.value = true
//     timerId = setInterval(() => {
//       queryComposable.refetch() // Triggers TanStack Query refresh
//     }, options.interval)
//   }

//   const stop = () => {
//     if (timerId) {
//       clearInterval(timerId)
//       timerId = null
//     }
//     isPolling.value = false
//   }

//   // 🔥 The Magic: Vue handles everything automatically based on component lifecycle
//   onMounted(() => start())
//   onUnmounted(() => stop())

//   // We still return the controls JUST IN CASE the UI wants a manual pause button
//   return {
//     ...queryComposable, // Flattens data, isLoading, etc. so they pass through
//     isPolling,
//     stopPolling: stop,
//     startPolling: start
//   }
// }

import { createApp } from "vue"
import App from "@packages/views/App.vue"
import { createQuery } from "@packages/plugins/query"
import { createRouter } from "@packages/plugins/router"
import { createStore } from "@packages/plugins/store"

createApp(App)
  .use(createQuery)
  .use(createRouter)
  .use(createStore)
  .mount("#app")

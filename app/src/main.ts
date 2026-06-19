import { createApp } from "vue"
import App from "@core/views/App.vue"
import { createQuery } from "@core/plugins/query"
import { createRouter } from "@core/plugins/router"
import { createStore } from "@core/plugins/store"

createApp(App)
  .use(createQuery)
  .use(createRouter)
  .use(createStore)
  .mount("#app")

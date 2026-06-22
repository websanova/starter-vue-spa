import { createApp } from "vue"
import App from "@shared/views/App.vue"
import { createQuery } from "@shared/plugins/query"
import { createRouter } from "@shared/plugins/router"
import { createStore } from "@shared/plugins/store"

createApp(App)
  .use(createQuery)
  .use(createRouter)
  .use(createStore)
  .mount("#app")

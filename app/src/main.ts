import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { installShared } from "@shared/plugins"
import "@shared/assets/main.css"

const app = createApp(App)

installShared(app)
app.use(router)
app.mount("#app")

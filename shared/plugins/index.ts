import type { App } from "vue"

/**
* Registers plugins shared by every app. Each app calls this from its main.ts
* before mounting so cross app concerns live in one place.
*/
export function installShared(app: App) {
  void app
}

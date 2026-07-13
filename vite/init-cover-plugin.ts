import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import type { Plugin } from "vite"

const token = "<!-- init-cover -->"

/**
 * Injects the pre-mount shell into index.html at build time.
 *
 * Replaces the `<!-- init-cover -->` token with the shared cover, style,
 * and script from init-cover.html so a logo and the correct color scheme
 * paint before the bundle parses. The mounted app tears them down via
 * removeInitCover.
 */
export function initCover(): Plugin {
  const path = fileURLToPath(new URL("../shared/init-cover.html", import.meta.url))

  return {
    name: "init-cover",
    transformIndexHtml(html) {
      return html.replace(token, () => readFileSync(path, "utf-8"))
    }
  }
}

/**
 * Removes the static pre-mount shell injected in index.html.
 *
 * The cover, inline script, and inline style are emitted as `cover-init`,
 * `script-init`, and `style-init` so something is visible before the bundle
 * parses. Call once the app has mounted to tear them down.
 */
export function removeInitCover() {
  ['cover', 'script', 'style'].forEach((key) => {
    const el = document.getElementById(key + '-init')

    if (el) {
      el.remove()
    }
  })
}

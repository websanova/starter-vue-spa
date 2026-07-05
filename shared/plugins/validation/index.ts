import type { App } from "vue"
import { configure } from "vee-validate"

/**
 * Configures vee-validate so fields validate only on submit. Disables the eager blur, change, and input triggers to avoid showing errors while the user is still typing.
 */
function createValidation(_app: App) {
  configure({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnInput: false,
    validateOnModelUpdate: false,
  })
}

export { createValidation }

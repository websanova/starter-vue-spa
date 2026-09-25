import type { Settings } from '@shared/models/settings'

/**
 * Shared settings defaults applied across every app. Merged over the API
 * response and under each app's local config. Partial because any field left
 * out falls through to the API response, and empty because nothing currently
 * needs the same override in both apps - it stays as the seam for when
 * something does.
 */
export const settings: Partial<Settings> = {}

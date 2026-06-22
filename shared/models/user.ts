/**
 * General user resource shape for app display. Kept minimal here; list and item variants can split out if their detail levels diverge.
 */
export interface User {
  id: number
  name: string
  email: string
}

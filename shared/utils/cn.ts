import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges class values and resolves Tailwind conflicts.
 *
 * Runs clsx for conditional joins, then tailwind-merge so a later utility
 * wins over an earlier one in the same group.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import type { UseMutationReturnType } from "@tanstack/vue-query"

/**
* Maps a TanStack mutation to a neutral async action shape. Keeps the library
* vocabulary (mutateAsync, isPending) sealed inside the model layer so views
* and components speak run, pending, error instead.
*/
export function toAction<TData, TError, TVars, TContext>(
  mutation: UseMutationReturnType<TData, TError, TVars, TContext>
) {
  return {
    run: mutation.mutateAsync,
    pending: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset
  }
}

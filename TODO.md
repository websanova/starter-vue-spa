# SPA Bootstrap / Loading

Build bottom-up: each step depends only on the ones above it. The real architecture fork is step 3.

1. Static cover in `index.html` + `useCover`
   - Inline cover/style markup that paints before JS. `remove()` deletes the init elements by id.
   - No dependencies. Verify: load app, see cover, see it vanish on mount.

2. App store + `useLoaded` gate (stubbed flags)
   - Wire `App.vue` cover-to-content handoff using a fake `isSiteLoaded`.
   - Proves the gating + fade Transition before any real data exists.

3. First real loader behind the gate
   - Pick `settings` or `auth` (whichever the others depend on).
   - Locks the Pinia-vs-TanStack-query decision. Every other loader copies this pattern.

4. Remaining loaders (i18n, content)
   - Cloned from step 3's pattern.

5. Maintenance mode
   - `503` interceptor in `shared/lib/http` -> store flag -> `CoverMaintenance`.

6. Update check
   - Detection mechanism (version header mismatch, polled `/version`, or build-hash) -> store flag -> `CoverUpdate`.

my-monorepo/
 ┣ apps/                       # Application Portals (FSD Top-Level Run times)
 ┃ ┣ admin/                    # Admin Portal Workspace
 ┃ ┃ ┣ src/
 ┃ ┃ ┃ ┣ app/                  # Local configuration layer
 ┃ ┃ ┃ ┃ ┣ router/
 ┃ ┃ ┃ ┃ ┃ ┗ index.ts          # Admin-only routing map
 ┃ ┃ ┃ ┃ ┗ index.vue           # Admin root wrapper (renders shared AppLayout)
 ┃ ┃ ┃ ┗ main.ts               # Admin application entry point
 ┃ ┃ ┗ package.json
 ┃ ┃
 ┃ ┣ app/                      # Customer App Workspace
 ┃ ┃ ┣ src/
 ┃ ┃ ┃ ┣ app/
 ┃ ┃ ┃ ┃ ┣ router/
 ┃ ┃ ┃ ┃ ┃ ┗ index.ts          # Customer-only routing map
 ┃ ┃ ┃ ┃ ┗ index.vue
 ┃ ┃ ┃ ┗ main.ts               # Customer app entry point
 ┃ ┃ ┗ package.json
 ┃ ┃
 ┃ ┗ studio/                   # Studio Portal Workspace
 ┃   ┣ src/
 ┃   ┃ ┣ app/
 ┃   ┃ ┃ ┣ router/
 ┃   ┃ ┃ ┃ ┗ index.ts          # Studio-only routing map
 ┃   ┃ ┃ ┗ index.vue
 ┃   ┃ ┗ main.ts               # Studio app entry point
 ┃   ┗ package.json
 ┃
 ┗ packages/                   # Shared Code Repositories
   ┗ shared/                   # FSD "Shared Package" (Flattened, no internal src/)
     ┣ pages/                  # Shared domain pages
     ┣ widgets/                # Shared layout blocks
     ┃ ┗ app-layout/
     ┃   ┣ ui/
     ┃   ┃ ┗ AppLayout.vue     # Global structural grid template with <RouterView />
     ┃   ┗ index.ts            # Layout Public API
     ┣ features/               # Shared user actions
     ┃ ┗ toggle-theme/         # Clickable theme switch component
     ┃   ┣ ui/
     ┃   ┃ ┗ ThemeToggle.vue
     ┃   ┗ index.ts
     ┣ entities/               # Shared business logic and data state
     ┃ ┗ theme/                # Global theme data context
     ┃   ┣ model/
     ┃   ┃ ┗ store.ts          # Pinia store managing 'light' vs 'dark' theme
     ┃   ┗ index.ts
     ┣ shared/                 # Shared atomic blocks & design system
     ┃ ┣ ui/                   # Reusable components (UiButton, UiInput)
     ┃ ┣ lib/                  # Centralized plugin drivers (router, store, i18n configs)
     ┃ ┃ ┣ router.ts           # Reused router core instance
     ┃ ┃ ┣ store.ts            # Reused Pinia instance
     ┃ ┃ ┗ i18m.ts             # Reused Vue-i18n instance
     ┃ ┗ styles/               # Global design tokens, resets, styling
     ┃   ┣ _tokens.css         # Light and Dark theme CSS variables
     ┃   ┗ main.css
     ┣ index.ts                # Shared Package Master Entry Point (Public API Gateway)
     ┗ package.json            # Named "@shared/core" or similar workspace moniker




https://feature-sliced.design/blog/frontend-monorepo-explained
https://medium.com/@khajamoinuddinsameer/refactoring-frontend-code-using-the-factory-design-pattern-a-scalable-vue-3-approach-818ac2848b2d
# Fashion E-commerce Monorepo

This project contains two React apps under rontend: dmin and client (Vite + React).

## Structure

- rontend/admin: Admin dashboard
  - src/api: API clients
  - src/components: Reusable UI components
  - src/features: Feature slices/modules
  - src/hooks: Custom hooks
  - src/layouts: Layout components
  - src/pages: Page components
  - src/routes: Routing setup
  - src/store: State management
  - src/styles: Global and module styles
  - src/utils: Utilities/helpers
  - src/types: Shared/internal types
  - src/assets: Static assets
- rontend/client: Customer-facing storefront (same structure as admin)

## Conventions

- Use absolute imports via Vite aliases when adding features.
- Keep feature-specific components inside src/features/<featureName> when possible.
- Place shared UI in src/components.


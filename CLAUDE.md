# Claude Reference Guide — test-repo

## Project

- **Repository:** `tesserix/test-repo`
- **GitHub Org:** `tesserix`
- **Description:** A modern petstore application with customer-facing storefront, admin dashboard, and checkout system. Built with Next.js, TypeScript, and Tailwind CSS.

## Critical Rules

### 1. Git Identity

Always configure before any commit:
```bash
git config user.name "sam123ben"
git config user.email "samyak.rout@gmail.com"
```

### 2. No AI References

NEVER include Claude, Copilot, Anthropic, AI tool, or Co-Authored-By mentions in:
- Commit messages, PR titles or descriptions
- Code comments or changelog entries

### 3. CI Build Procedure

The `tesserix` GitHub org has limited Actions minutes for private repos.
Every CI build requires a public-to-build-to-private cycle:
```bash
gh repo edit tesserix/test-repo --visibility public --accept-visibility-change-consequences
git push origin main
# Wait for CI to complete
gh run list --repo tesserix/test-repo --limit 3
# Once all green:
gh repo edit tesserix/test-repo --visibility private --accept-visibility-change-consequences
```

### 4. No Manual kubectl apply

All K8s changes go through ArgoCD via the `tesserix-k8s` repo.

### 5. SQL Schemas

All database schemas live in `tesserix-k8s/charts/apps/db-schema-bootstrap/schemas/`.
Application repos contain only ORM models — never raw .sql files.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Package Manager:** npm
- **Styling:** Tailwind CSS
- **Testing:** Vitest + React Testing Library
- **Build System:** Make
- **CI/CD:** GitHub Actions
- **Deployment:** Docker Compose (local), Docker (containerized)
- **GCP Project:** `tesseracthub-480811`
- **GCP Region:** `asia-south1`
- **GKE Cluster:** `tesseract-prod-in-gke`

## Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Storefront home
│   ├── (auth)/                    # Route group for auth pages
│   │   └── admin-login/
│   │       └── page.tsx           # Admin login (outside guarded layout)
│   ├── admin/                     # Admin dashboard (protected)
│   │   ├── layout.tsx             # Admin layout with nav
│   │   ├── page.tsx               # Admin dashboard home
│   │   ├── products/
│   │   │   └── page.tsx           # Product management
│   │   ├── categories/
│   │   │   └── page.tsx           # Category management
│   │   └── orders/
│   │       └── page.tsx           # Order management
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx           # Product detail page
│   ├── checkout/
│   │   └── page.tsx               # Checkout flow
│   ├── api/                       # Route handlers (server-side)
│   │   ├── products/              # Product endpoints
│   │   ├── categories/            # Category endpoints
│   │   ├── checkout/              # Checkout endpoints
│   │   ├── orders/                # Order endpoints
│   │   └── admin/                 # Admin auth endpoints
│   └── globals.css                # Tailwind / global styles
├── components/
│   ├── ui/                        # Primitive UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   ├── storefront/                # Storefront-specific components
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── CategoryNav.tsx
│   │   ├── SearchBar.tsx
│   │   └── Cart.tsx
│   ├── checkout/                  # Checkout components
│   │   ├── ShippingForm.tsx
│   │   ├── PaymentForm.tsx
│   │   └── OrderConfirmation.tsx
│   ├── admin/                     # Admin-specific components
│   │   ├── AdminNav.tsx
│   │   ├── ProductTable.tsx
│   │   ├── CategoryTable.tsx
│   │   ├── OrderTable.tsx
│   │   ├── ProductForm.tsx
│   │   └── CategoryForm.tsx
│   └── layout/                    # Layout components
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/                           # Pure functions, utilities, API clients
│   ├── api-client.ts              # Fetch wrapper for API calls
│   ├── validation.ts              # Zod schemas for forms & API validation
│   ├── auth.ts                    # Admin auth helpers (httpOnly cookie)
│   ├── cart.ts                    # Client-side cart utilities
│   ├── payment.ts                 # Payment simulation helpers
│   └── utils.ts                   # General utilities (clsx, formatting, etc.)
├── hooks/                         # Custom React hooks
│   ├── useCart.ts                 # Cart state management
│   ├── useProducts.ts             # Product fetching
│   └── useAuth.ts                 # Admin auth state
├── types/                         # Shared TypeScript types
│   ├── product.ts
│   ├── category.ts
│   ├── order.ts
│   ├── cart.ts
│   └── api.ts
└── middleware.ts                  # Next.js middleware (auth guards)

tests/
├── unit/                          # Vitest unit tests
│   ├── components/
│   ├── hooks/
│   └── lib/
└── e2e/                           # Playwright e2e tests (if applicable)

.github/
├── workflows/
│   └── ci.yml                     # GitHub Actions CI pipeline

Dockerfile                         # Docker image definition
docker-compose.yml                 # Local development & deployment
Makefile                           # Build & development commands
next.config.ts                     # Next.js configuration
tsconfig.json                      # TypeScript strict mode
package.json                       # Dependencies & scripts
postcss.config.js                  # PostCSS (Tailwind)
tailwind.config.ts                 # Tailwind configuration
vitest.config.ts                   # Vitest configuration
vitest.setup.ts                    # Vitest setup file
.eslintrc.json                     # ESLint rules (next/core-web-vitals)
```

## Commands

```bash
# Development
npm run dev              # Start Next.js dev server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Start production server

# Linting & Testing
npm run lint             # Run ESLint
npm run test             # Run Vitest (single run)
npm run test:watch       # Run Vitest in watch mode

# Docker
make build               # Build Docker image
make up                  # Start services with docker-compose
make down                # Stop services
make logs                # View container logs
```

## Skills & Conventions

### File Naming
- **Components:** `PascalCase.tsx` (e.g., `ProductCard.tsx`, `AdminNav.tsx`)
- **Hooks:** `useCamelCase.ts` (must start with `use`, e.g., `useCart.ts`)
- **Utilities & API:** `kebab-case.ts` (e.g., `api-client.ts`, `validation.ts`)
- **Tests:** Co-located or in `tests/unit/<feature>.test.tsx`

### Component Patterns

**Default to server components.** Add `"use client"` ONLY when you need:
- React hooks (`useState`, `useEffect`, `useContext`, etc.)
- Browser APIs (`window`, `localStorage`, `document`)
- Event handlers (`onClick`, `onChange`, etc.)

Example server component (no `"use client"`):
```tsx
// src/components/storefront/ProductCard.tsx
import { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-bold">{product.name}</h3>
      <p className="text-sm text-gray-600">${product.price}</p>
    </div>
  );
}
```

Example client component (with `"use client"`):
```tsx
// src/components/storefront/Cart.tsx
"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";

export function Cart() {
  const { items, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Cart ({items.length})</button>
      {isOpen && (
        <div>
          {items.map((item) => (
            <div key={item.id}>
              {item.name} — <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Styling

- **Use Tailwind CSS exclusively.** No CSS modules unless already in the project.
- **Conditional classes:** Use `clsx` for readability.
  ```tsx
  import clsx from "clsx";
  
  <button className={clsx("px-4 py-2", isActive && "bg-blue-600")}>
    Click me
  </button>
  ```

### Validation & API

- **Zod schemas** in `src
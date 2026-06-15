# Claude Reference Guide — test-repo

## Project

- **Repository:** `tesserix/test-repo`
- **GitHub Org:** `tesserix`
- **Project Name:** Pet Store Platform (MVP)
- **GCP Project:** `tesseracthub-480811`
- **GCP Region:** `asia-south1`
- **GKE Cluster:** `tesseract-prod-in-gke`

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
Application repos contain only ORM models (Prisma) — never raw .sql files.

## Project Overview

**Pet Store Platform** is a monolithic Next.js application serving both customer-facing storefront and admin dashboard from a single codebase. The MVP covers:
- **Customer Storefront:** Browse categories, view products, mobile-first checkout with Stripe
- **Admin Dashboard:** Manage products, categories, and orders
- **Authentication:** NextAuth.js with JWT + refresh token rotation
- **Database:** PostgreSQL with Prisma ORM
- **Deployment:** Docker container via docker-compose (local) or K8s (production)

**Primary Success Metric:** Mobile checkout completion rate ≥ 4% within 30 days of launch.
**Acceptable Failure Threshold:** If mobile conversion < 2% at day 14, halt and run UX audit before continuing.

**Out of Scope (MVP):** Inventory sync, third-party integrations, multi-region deployment, separate service deployments.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript + JavaScript |
| **Package Manager** | npm |
| **UI Components** | shadcn/ui (Tailwind CSS) |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Authentication** | NextAuth.js (JWT + refresh rotation) |
| **Payments** | Stripe Elements |
| **Testing** | Vitest + React Testing Library |
| **Linting** | ESLint (next/core-web-vitals + @typescript-eslint) |
| **Build System** | Make |
| **CI/CD** | GitHub Actions |
| **Deployment** | Docker + docker-compose (local) / K8s (prod) |

## Project Structure

```
.
├── .github/                    # GitHub Actions workflows
├── .platform/                  # Platform-specific configs
├── k8s/                        # Kubernetes manifests (local reference only)
├── prisma/                     # Prisma schema and migrations
│   └── schema.prisma           # Database schema definition
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (wraps all children)
│   │   ├── page.tsx            # Index route (storefront home)
│   │   ├── (auth)/             # Route group: login, register, forgot-password
│   │   ├── (storefront)/       # Route group: products, categories, cart, checkout
│   │   ├── (admin)/            # Route group: admin dashboard (protected)
│   │   ├── api/                # Route handlers (server-side)
│   │   │   ├── auth/           # NextAuth.js endpoints
│   │   │   ├── products/       # Product CRUD endpoints
│   │   │   ├── categories/     # Category CRUD endpoints
│   │   │   ├── orders/         # Order endpoints
│   │   │   └── stripe/         # Stripe webhook handlers
│   │   └── globals.css         # Tailwind + global styles
│   ├── components/             # Reusable React components
│   │   ├── ui/                 # Primitive UI (Button, Card, Input, etc.)
│   │   ├── storefront/         # Storefront-specific components
│   │   ├── admin/              # Admin-specific components
│   │   ├── auth/               # Auth-related components
│   │   └── layout/             # Header, footer, navigation
│   ├── lib/                    # Pure functions, utilities, API clients
│   │   ├── auth.ts             # NextAuth.js config
│   │   ├── db.ts               # Prisma client singleton
│   │   ├── stripe.ts           # Stripe client
│   │   ├── api-client.ts        # Fetch wrapper for API calls
│   │   └── utils.ts            # General utilities (clsx, cn, etc.)
│   ├── hooks/                  # Custom React hooks (use* prefix mandatory)
│   │   ├── useAuth.ts          # Auth context hook
│   │   ├── useCart.ts          # Cart state hook
│   │   └── useProducts.ts      # Product data fetching hook
│   ├── types/                  # Shared TypeScript types
│   │   ├── index.ts            # Re-export all types
│   │   ├── product.ts          # Product types
│   │   ├── order.ts            # Order types
│   │   └── user.ts             # User/auth types
│   └── middleware.ts           # Next.js middleware (auth checks, redirects)
├── tests/
│   ├── unit/                   # Vitest unit tests
│   │   ├── components/         # Component tests
│   │   ├── hooks/              # Hook tests
│   │   └── lib/                # Utility function tests
│   └── e2e/                    # Playwright end-to-end tests (if applicable)
├── .dockerignore
├── .editorconfig
├── .gitignore
├── CLAUDE.md                   # This file
├── DEPLOYMENT.md               # Deployment runbook
├── Dockerfile                  # Multi-stage Docker build
├── Makefile                    # Build and dev commands
├── README.md                   # Project overview and setup
├── cloudbuild.yaml             # Cloud Build config (GCP)
├── docker-compose.yml          # Local dev environment
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS + Tailwind config
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript strict mode ON
└── vitest.config.ts            # Vitest configuration
```

## Commands

All commands are defined in `package.json` scripts:

```bash
# Development
npm run dev              # Start Next.js dev server (http://localhost:3000)

# Production
npm run build            # Build Next.js app for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run test             # Run Vitest (single run)
npm run test:watch      # Run Vitest in watch mode

# Database
npm run prisma:migrate  # Create and apply Prisma migrations
npm run prisma:studio   # Open Prisma Studio (local DB explorer)

# Docker
make build              # Build Docker image
make up                 # Start docker-compose stack
make down               # Stop docker-compose stack
make logs               # Tail docker-compose logs
```

## Skills & Conventions

### File Naming
- **Components:** `PascalCase.tsx` (e.g., `ProductCard.tsx`, `CheckoutForm.tsx`)
- **Hooks:** `useThing.ts` (must start with `use`, e.g., `useCart.ts`)
- **Utilities:** `kebab-case.ts` (e.g., `format-price.ts`, `validate-email.ts`)
- **Types:** `kebab-case.ts` (e.g., `product.ts`, `order.ts`)
- **Tests:** Co-located in `tests/unit/<category>/<Name>.test.tsx` or alongside source

### Component Patterns

**Default to server components.** Add `"use client"` ONLY if you need:
- React hooks (`useState`, `useEffect`, `useContext`, etc.)
- Browser APIs (`window`, `localStorage`, `navigator`)
- Event handlers (`onClick`, `onChange`, etc.)

**Example server component (product listing):**
```tsx
// src/components/storefront/ProductGrid.tsx
import { prisma } from "@/lib/db";
import { ProductCard } from "./ProductCard";

export default async function ProductGrid({ categoryId }: { categoryId: string }) {
  const products = await prisma.product.findMany({
    where: { categoryId },
    include: { category: true },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Example client component (add to cart button):**
```tsx
// src/components/storefront/ProductCard.tsx
"use client";

import { useState } from "react";
import {
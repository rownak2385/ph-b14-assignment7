# BazarDor Project Setup

## Architecture

BazarDor uses the Next.js App Router. Application routes and global styles live in `src/app`; reusable UI belongs in `src/components`; shared utilities belong in `src/lib`; shared types belong in `src/types`; and reusable React hooks belong in `src/hooks`. Static browser assets live in `public`.

The Phase 1 homepage is intentionally minimal. Product data, category routes, authentication, and other assignment features are added only in their designated milestones.

## Technologies

- Next.js with the App Router
- React and TypeScript
- Tailwind CSS
- ESLint with Next.js rules
- Lucide React for future interface icons
- npm for dependency management

Better Auth and PostgreSQL are planned for the authentication milestone and are not installed in Phase 1.

## Installation

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
```

Copy `.env.example` to `.env.local` when a later milestone requires local credentials. Never commit `.env.local`.

## Development Commands

```bash
npm run dev    # Start the local development server
npm run lint   # Run ESLint
npm run build  # Create a production build
npm run start  # Serve the completed production build
```

Open `http://localhost:3000` after starting the development server.

## Development Milestones

1. Project foundation, assets, styling, documentation, and Git safety
2. Public layout and navigation foundations
3. Product data and homepage sections
4. Category and product-detail experiences
5. Better Auth and PostgreSQL integration
6. Profile and authenticated flows
7. Accessibility, resilience, and UI refinement
8. Final verification and deployment

Each milestone must preserve completed work, avoid implementing later phases early, and pass verification before completion.

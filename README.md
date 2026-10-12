# বাজার দর — BazarDor

BazarDor is a responsive Bengali market-price application for exploring essential-product prices across Bangladesh. It combines live product data, category browsing, market comparisons, protected product details, and persistent user profiles in a production-ready Next.js application.

## Live website

Production deployment is being finalized.

Repository: [github.com/rownak2385/ph-b14-assignment7](https://github.com/rownak2385/ph-b14-assignment7)

## Key features

- Live product catalogue with Bengali prices, units, dates, and a scrolling price ticker
- Top price-riser and price-faller sections plus a responsive all-products grid
- Category pages with default, low-to-high, and high-to-low numeric sorting
- Server-protected product details with real market ranges and clearly labelled estimated statistics
- Better Auth email/password, Google, and GitHub authentication backed by Neon PostgreSQL
- Protected profile and profile-edit routes with persistent name updates and synchronized sessions
- Responsive navigation, loading skeletons, Bengali error states, toast feedback, and friendly 404 pages

## Technologies

- Next.js 16 App Router and React 19
- TypeScript
- Tailwind CSS 4
- Better Auth
- Neon PostgreSQL with `pg`
- React Hot Toast
- Lucide React
- Vercel

## Local setup

Requirements: Node.js 20.9 or newer and npm.

```bash
git clone https://github.com/rownak2385/ph-b14-assignment7.git
cd ph-b14-assignment7
npm install
```

Copy `.env.example` to `.env.local` and configure these variables without committing their values:

```text
DATABASE_URL
BETTER_AUTH_SECRET
BETTER_AUTH_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
```

For local development, set `BETTER_AUTH_URL=http://localhost:3000` and configure the OAuth callbacks documented in [PROJECT_SETUP.md](./PROJECT_SETUP.md).

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Quality and production commands:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

## Assignment reference

The original Programming Hero assignment specification is preserved in [ASSIGNMENT.md](./ASSIGNMENT.md).

# FurnionsCTO

Foundation for the FurnionsCTO codebase using **Next.js (App Router) + TypeScript**, with ESLint, Prettier, and Jest.

## Requirements

- Node.js **>= 18.18**
- npm (comes with Node.js)

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Task runner (npm scripts)

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - start the production server (requires `npm run build` first)
- `npm run lint` - run ESLint (Next.js rules)
- `npm run format` - format the repo with Prettier
- `npm run format:check` - verify formatting (CI-friendly)
- `npm run typecheck` - run TypeScript typechecking
- `npm run test` - run unit tests with Jest
- `npm run test:watch` - run Jest in watch mode

## Project structure

- `src/app` - Next.js App Router pages/layouts
- `src/lib` - shared utilities
- `public` - static assets served at the site root

## Environment variables

Copy `.env.example` to `.env.local` and adjust as needed.

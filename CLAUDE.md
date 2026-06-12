# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 project using React 19, Tailwind CSS v4, and shadcn/ui (radix-rhea variant). **This version of Next.js has breaking changes from earlier versions** — APIs, conventions, and file structure differ from training data. Always consult `node_modules/next/dist/docs/` before writing code.

## Development Commands

- `npm run dev` — Start development server at http://localhost:3000
- `npm run build` — Production build
- `npm start` — Start production server (requires build first)
- `npm run lint` — Run ESLint

## Tech Stack Notes

### Tailwind CSS v4
This project uses Tailwind v4, which has significant breaking changes from v3:
- CSS imports use `@import "tailwindcss"` instead of `@tailwind` directives
- Configuration uses `@theme inline` blocks within CSS instead of `tailwind.config.js`
- The `@custom-variant` directive is used for dark mode: `@custom-variant dark (&:is(.dark *))`
- Color values use OKLCH color space: `oklch(0.145 0 0)` instead of hex/RGB

### shadcn/ui
- Style variant: `radix-rhea` with neutral base color
- Icons: lucide-react
- Component alias: `@/components/ui`
- New components are added via `npx shadcn@latest add <component>`
- The `cn()` utility in `lib/utils.ts` combines clsx + tailwind-merge

### Path Aliases
- `@/*` resolves to project root (`./`)

## Architecture

- **App Router**: Next.js app directory structure (`app/`)
- **Font Setup**: Uses next/font with Geist (Sans/Mono) and Inter, exposed as CSS variables
- **Styling**: Theme tokens defined in `app/globals.css` using CSS custom properties with OKLCH values
- **Component Structure**:
  - `app/` — Next.js app router pages and layouts
  - `components/ui/` — shadcn/ui primitives
  - `lib/utils.ts` — shared utilities (cn function)

# Computis – UI Fixes & AI Enhancements (shadcn/ui + TanStack Table)

This bundle aligns to a common Next.js + Tailwind design system using **shadcn/ui** primitives,
**TanStack Table v8** for data grids, **React Hook Form + zod** patterns, and **App Router** API routes.

## What’s included
- AI Confidence badges using `<Badge>` + `<Tooltip>`
- Anomaly flags with contextual `<Tooltip>`
- AI Classification Panel using `<Card>` + `<Accordion>` with Accept/Reject
- Searchable, filterable AI Audit Log using `<Table>`, `<Input>`, `<Select>`, `<ScrollArea>`
- TanStack DataTable wrapper and columns for Transactions with AI status/action cells
- API routes + types (swap mocks for your services)

> If your project already has shadcn/ui set up, these drop straight in. Otherwise run `npx shadcn@latest init` and generate the referenced components (button, badge, tooltip, card, accordion, table, input, select, scroll-area, sheet if you want a right drawer).

## Install
- Ensure these packages exist: `@tanstack/react-table`, `react-hook-form`, `zod`
- Ensure shadcn/ui components exist at `@/components/ui/*`

## Files
- `components/ai/*` – AI UI primitives
- `components/data-table/*` – TanStack wrapper + column defs for transactions
- `app/api/*` – mocked API routes (replace with real services)
- `lib/*` – mock classifier and audit log helpers
- `types/ai.ts` – shared types

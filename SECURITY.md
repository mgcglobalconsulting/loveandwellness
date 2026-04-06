# Security Audit — Love & Wellness Coaching

> Last reviewed: 2026-04-05

---

## Environment Variable Audit

### NEXT_PUBLIC_ Variables (browser-exposed)

| Variable | Status | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | **Correctly public** | Used in middleware and Supabase client init. The URL is safe to expose — RLS policies enforce all data access. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Correctly public** | Intended to be public per Supabase design. RLS is the security boundary, not this key. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | **Defined but unused** | The current checkout flow uses Stripe-hosted Checkout Sessions (server-side redirect) — `loadStripe()` is never called. Wire this key if migrating to embedded Stripe Elements. Otherwise remove to reduce confusion. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | **Defined but unused** | Google Analytics 4 is not installed. To activate: add a `<Script strategy="afterInteractive">` tag in `app/layout.tsx` pointing to `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`. |
| `NEXT_PUBLIC_CALENDLY_URL` | **Defined but unused** | No Calendly widget is rendered. Wire to a `react-calendly` embed when scheduling is added, or remove. |
| `NEXT_PUBLIC_SITE_URL` | **Correctly public** | Used in Stripe checkout `success_url` construction. Safe. |

### Server-Only Variables (never reach browser)

| Variable | Used In | Status |
|---|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | `app/api/stripe/webhook/route.ts`, `app/api/admin/applications/[id]/route.ts`, `app/api/admin/orders/route.ts`, `app/(admin)/admin/page.tsx`, `app/(admin)/admin/clients/page.tsx`, `app/(admin)/admin/analytics/page.tsx` | **SAFE** — all usages are in async Server Components or Route Handlers. No `"use client"` directive on any of these files. Key never enters the browser bundle. |
| `STRIPE_SECRET_KEY` | `app/api/donations/route.ts`, `app/api/stripe/checkout/route.ts`, `app/api/stripe/webhook/route.ts` | **SAFE** — Route Handlers only. |
| `STRIPE_WEBHOOK_SECRET` | `app/api/stripe/webhook/route.ts` | **SAFE** — used to verify Stripe webhook signatures server-side only. |
| `STRIPE_PRICE_VIP_DAY` | `app/api/stripe/checkout/route.ts` | **SAFE** — server-side only. |
| `STRIPE_PRICE_GROUP_COACHING` | `app/api/stripe/checkout/route.ts` | **SAFE** — server-side only. |
| `STRIPE_PRICE_MASTERCLASS` | `app/api/stripe/checkout/route.ts` | **SAFE** — server-side only. |
| `RESEND_API_KEY` | Supabase Edge Functions | **SAFE** — read via `Deno.env.get()` in Edge Function runtime, never in Next.js client bundle. |

---

## RLS Policy Summary

Row Level Security is enabled on all 9 tables. Migration `002_rls_hardening.sql` adds:

- **profiles**: Users can only INSERT/SELECT/UPDATE their own row. Admins bypass via subquery.
- **orders**: Users can only SELECT their own orders. Stripe webhook inserts via service role (bypasses RLS entirely — correct).
- **leads**: Admin UPDATE and DELETE policies added.

### Schema Clarifications

- There is **no `clients` table** — client data lives in `profiles` (role-based).
- There is **no `appointments` table** — use `webinars` for scheduling events.

---

## Known Vulnerabilities

### Next.js (next@14.2.35)

npm audit reports vulns in the range `9.5.0–15.5.13`. The only fix is upgrading to Next.js 16 (major version). **Do not upgrade before the Monday 2026-04-07 launch** — risk of breaking changes outweighs benefit.

**Post-launch action**: Evaluate Next.js 15 upgrade after launch. Most CVEs require unusual server configurations or dev-server access to exploit.

### eslint-config-next / glob (High)

`glob` CLI command injection via `--cmd` flag. This is **dev tooling only** — never runs in the production Vercel build output. No action needed.

### @react-email/code-block / prismjs (Moderate)

PrismJS DOM clobbering vulnerability in email preview tooling (`npm run email`). Not exploitable in production email sending (Resend renders server-side). No action needed.

---

## Security Headers

`vercel.json` configures the following response headers on all routes:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(self)`

**Deferred**: `Content-Security-Policy` — requires full audit of inline scripts used by Supabase Realtime, Stripe, Framer Motion, and Cloudinary before a policy can be written without breaking the UI.

---

## Middleware Protection

`middleware.ts` protects:
- `/dashboard/*` — requires authenticated session
- `/admin/*` — requires authenticated session + `role = 'admin'` in profiles table

The Stripe webhook route (`/api/stripe/webhook`) is explicitly excluded from middleware via the matcher config, allowing Stripe to POST without a session.

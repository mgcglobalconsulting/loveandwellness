-- ============================================================
-- 002_rls_hardening.sql — Additive RLS hardening
-- Applied on top of either 001_initial_schema.sql OR
-- 20260327_init_schema.sql (both define the same tables).
--
-- IMPORTANT SCHEMA NOTES:
--   - "clients" = the `profiles` table (no separate clients table)
--   - "appointments" table does NOT exist; use `webinars` for scheduling
--   - Admin portal bypasses RLS via SUPABASE_SERVICE_ROLE_KEY (server-only)
--   - The Stripe webhook also uses service role — never exposed to browser
--
-- All policies use DO $$ BEGIN ... EXCEPTION WHEN duplicate_object THEN null; END $$;
-- so this migration is idempotent and safe to run multiple times.
-- ============================================================

-- ── profiles ────────────────────────────────────────────────

-- Users may only INSERT their own profile row (id must match auth.uid())
DO $$ BEGIN
  CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Authenticated users may SELECT only their own profile row
DO $$ BEGIN
  CREATE POLICY "Authenticated users select own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Admins may SELECT all profile rows (required for admin portal)
DO $$ BEGIN
  CREATE POLICY "Admins select all profiles"
    ON public.profiles FOR SELECT
    USING (
      EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = auth.uid() AND p.role = 'admin'
      )
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Admins may UPDATE any profile row
DO $$ BEGIN
  CREATE POLICY "Admins update all profiles"
    ON public.profiles FOR UPDATE
    USING (
      EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = auth.uid() AND p.role = 'admin'
      )
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ── orders ──────────────────────────────────────────────────

-- Authenticated users may only SELECT their own orders
-- (Stripe webhook inserts orders via service role, bypassing RLS entirely)
DO $$ BEGIN
  CREATE POLICY "Authenticated users select own orders"
    ON public.orders FOR SELECT
    USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Admins may SELECT all orders (required for /admin/orders portal)
DO $$ BEGIN
  CREATE POLICY "Admins select all orders"
    ON public.orders FOR SELECT
    USING (
      EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = auth.uid() AND p.role = 'admin'
      )
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Admins may UPDATE any order (status changes via admin portal)
DO $$ BEGIN
  CREATE POLICY "Admins update all orders"
    ON public.orders FOR UPDATE
    USING (
      EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = auth.uid() AND p.role = 'admin'
      )
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ── leads ───────────────────────────────────────────────────

-- Admins may UPDATE lead records (e.g. mark as converted)
DO $$ BEGIN
  CREATE POLICY "Admins update leads"
    ON public.leads FOR UPDATE
    USING (
      EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = auth.uid() AND p.role = 'admin'
      )
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Admins may DELETE lead records
DO $$ BEGIN
  CREATE POLICY "Admins delete leads"
    ON public.leads FOR DELETE
    USING (
      EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = auth.uid() AND p.role = 'admin'
      )
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

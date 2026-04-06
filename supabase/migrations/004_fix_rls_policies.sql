-- ============================================================
-- 004_fix_rls_policies.sql — Fix infinite recursion in RLS policies
-- ============================================================

-- Create a security definer function to check admin status without triggering RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Drop problematic policies that cause infinite recursion
DROP POLICY IF EXISTS "Admins select all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins select all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins update all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins update leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can read all applications" ON public.applications;
DROP POLICY IF EXISTS "Admins can update applications" ON public.applications;

-- Recreate admin policies using the security definer function
CREATE POLICY "Admins select all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins update all profiles"
  ON public.profiles FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins select all orders"
  ON public.orders FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins update all orders"
  ON public.orders FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins update leads"
  ON public.leads FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can read all applications"
  ON public.applications FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update applications"
  ON public.applications FOR UPDATE
  USING (public.is_admin());
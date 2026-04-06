-- ============================================================
-- 005_fix_applications_rls.sql — Fix applications table RLS policies
-- ============================================================

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Anyone can submit application" ON public.applications;
DROP POLICY IF EXISTS "Admins can read all applications" ON public.applications;
DROP POLICY IF EXISTS "Admins can update applications" ON public.applications;

-- Recreate policies with proper syntax
CREATE POLICY "Anyone can submit application"
  ON public.applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can read all applications"
  ON public.applications FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update applications"
  ON public.applications FOR UPDATE
  USING (public.is_admin());
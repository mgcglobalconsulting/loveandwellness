-- ============================================================
-- 003_create_applications_table.sql — Create applications table if missing
-- ============================================================

CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  relationship_status TEXT,
  biggest_challenge TEXT,
  already_tried TEXT,
  commitment_level INTEGER CHECK (commitment_level BETWEEN 1 AND 10),
  investment_comfort TEXT,
  referral_source TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'not_a_fit', 'follow_up')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES public.profiles(id)
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Anyone can submit application"
    ON public.applications FOR INSERT
    WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Admins can read all applications"
    ON public.applications FOR SELECT
    USING (
      EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = auth.uid() AND p.role = 'admin'
      )
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Admins can update applications"
    ON public.applications FOR UPDATE
    USING (
      EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = auth.uid() AND p.role = 'admin'
      )
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

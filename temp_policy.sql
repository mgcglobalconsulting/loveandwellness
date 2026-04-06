DROP POLICY IF EXISTS "Anyone can submit application" ON public.applications; CREATE POLICY "Anyone can submit application" ON public.applications FOR INSERT TO anon WITH CHECK (true);

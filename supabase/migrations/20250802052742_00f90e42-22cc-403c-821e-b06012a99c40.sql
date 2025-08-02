-- First, check what policies exist and drop ALL existing policies on cricket_tournaments
DROP POLICY IF EXISTS "cricket_tournaments_insert_policy" ON public.cricket_tournaments;
DROP POLICY IF EXISTS "cricket_tournaments_select_policy" ON public.cricket_tournaments;  
DROP POLICY IF EXISTS "cricket_tournaments_update_policy" ON public.cricket_tournaments;

-- Now create fresh policies that allow public access
CREATE POLICY "public_cricket_tournaments_insert" 
ON public.cricket_tournaments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "public_cricket_tournaments_select" 
ON public.cricket_tournaments 
FOR SELECT 
USING (true);

CREATE POLICY "public_cricket_tournaments_update" 
ON public.cricket_tournaments 
FOR UPDATE 
USING (true);
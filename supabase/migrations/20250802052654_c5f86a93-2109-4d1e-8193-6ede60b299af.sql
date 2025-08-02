-- Fix RLS policies for cricket_tournaments table to allow public access
-- Drop existing policies that reference auth.users table
DROP POLICY IF EXISTS "Anyone can insert cricket tournament registrations" ON public.cricket_tournaments;
DROP POLICY IF EXISTS "Users can update their own registrations" ON public.cricket_tournaments;
DROP POLICY IF EXISTS "Users can view their own registrations by email" ON public.cricket_tournaments;

-- Create new simple policies that allow public access
CREATE POLICY "cricket_tournaments_insert_policy" 
ON public.cricket_tournaments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "cricket_tournaments_select_policy" 
ON public.cricket_tournaments 
FOR SELECT 
USING (true);

CREATE POLICY "cricket_tournaments_update_policy" 
ON public.cricket_tournaments 
FOR UPDATE 
USING (true);
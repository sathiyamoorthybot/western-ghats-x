-- Fix RLS policies for cricket_registrations table
-- Remove the problematic subqueries accessing auth.users

-- Drop all existing policies for cricket_registrations
DROP POLICY IF EXISTS "Users can view registrations by captain email" ON public.cricket_registrations;
DROP POLICY IF EXISTS "Users can update registrations by captain email" ON public.cricket_registrations;
DROP POLICY IF EXISTS "Anyone can view cricket registrations" ON public.cricket_registrations;
DROP POLICY IF EXISTS "Anyone can update cricket registrations" ON public.cricket_registrations;
DROP POLICY IF EXISTS "Anyone can insert cricket registrations" ON public.cricket_registrations;

-- Create simple policies that allow public access for tournament registration
CREATE POLICY "Public can insert cricket registrations" 
ON public.cricket_registrations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can view cricket registrations" 
ON public.cricket_registrations 
FOR SELECT 
USING (true);

CREATE POLICY "Public can update cricket registrations" 
ON public.cricket_registrations 
FOR UPDATE 
USING (true);
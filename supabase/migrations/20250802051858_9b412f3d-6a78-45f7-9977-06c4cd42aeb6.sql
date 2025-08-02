-- Fix RLS policies for cricket_registrations table
-- First check what policies exist and drop them all

-- Drop all possible existing policies 
DROP POLICY IF EXISTS "Users can view registrations by captain email" ON public.cricket_registrations;
DROP POLICY IF EXISTS "Users can update registrations by captain email" ON public.cricket_registrations;
DROP POLICY IF EXISTS "Anyone can view cricket registrations" ON public.cricket_registrations;
DROP POLICY IF EXISTS "Anyone can update cricket registrations" ON public.cricket_registrations;
DROP POLICY IF EXISTS "Anyone can insert cricket registrations" ON public.cricket_registrations;
DROP POLICY IF EXISTS "Public can insert cricket registrations" ON public.cricket_registrations;
DROP POLICY IF EXISTS "Public can view cricket registrations" ON public.cricket_registrations;
DROP POLICY IF EXISTS "Public can update cricket registrations" ON public.cricket_registrations;

-- Create new policies with unique names
CREATE POLICY "cricket_registrations_insert_policy" 
ON public.cricket_registrations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "cricket_registrations_select_policy" 
ON public.cricket_registrations 
FOR SELECT 
USING (true);

CREATE POLICY "cricket_registrations_update_policy" 
ON public.cricket_registrations 
FOR UPDATE 
USING (true);
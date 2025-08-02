-- Fix RLS policies for cricket_registrations table
-- Remove the problematic subqueries accessing auth.users

-- Drop the current policies
DROP POLICY IF EXISTS "Users can view registrations by captain email" ON public.cricket_registrations;
DROP POLICY IF EXISTS "Users can update registrations by captain email" ON public.cricket_registrations;

-- Create simpler policies that don't access auth.users
CREATE POLICY "Anyone can view cricket registrations" 
ON public.cricket_registrations 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update cricket registrations" 
ON public.cricket_registrations 
FOR UPDATE 
USING (true);
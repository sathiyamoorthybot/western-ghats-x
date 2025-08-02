-- Drop the incorrect policies that reference non-existent user_id column
DROP POLICY IF EXISTS "Users can insert their own registrations" ON public.cricket_registrations;
DROP POLICY IF EXISTS "Users can view their own registrations" ON public.cricket_registrations;
DROP POLICY IF EXISTS "Users can update their own registrations" ON public.cricket_registrations;

-- Create proper RLS policies for cricket_registrations table
-- Since this table doesn't have user_id, we'll allow public access for registration
-- and use captain_email to identify ownership for authenticated users

CREATE POLICY "Anyone can insert cricket registrations" 
ON public.cricket_registrations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view registrations by captain email" 
ON public.cricket_registrations 
FOR SELECT 
USING (
  auth.uid() IS NULL OR 
  captain_email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

CREATE POLICY "Users can update registrations by captain email" 
ON public.cricket_registrations 
FOR UPDATE 
USING (
  captain_email = (SELECT email FROM auth.users WHERE id = auth.uid())
);
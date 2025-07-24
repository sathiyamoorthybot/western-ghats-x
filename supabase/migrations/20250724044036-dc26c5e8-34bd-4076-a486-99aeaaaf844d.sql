-- Add address and emergency contact fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN address TEXT,
ADD COLUMN emergency_contact TEXT,
ADD COLUMN emergency_phone TEXT;
-- Create tables for Western Ghats X events

-- User profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Marathon registrations table
CREATE TABLE public.marathon_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  registration_number TEXT UNIQUE,
  race_type TEXT NOT NULL CHECK (race_type IN ('5k', '10k', 'half-marathon')),
  full_name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 16 AND age <= 80),
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  tshirt_size TEXT NOT NULL CHECK (tshirt_size IN ('xs', 's', 'm', 'l', 'xl', 'xxl')),
  blood_group TEXT NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  emergency_contact TEXT NOT NULL,
  emergency_phone TEXT NOT NULL,
  amount_paid DECIMAL(10,2) NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_id TEXT,
  registration_status TEXT DEFAULT 'active' CHECK (registration_status IN ('active', 'cancelled', 'transferred')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.marathon_registrations ENABLE ROW LEVEL SECURITY;

-- Marathon registrations policies
CREATE POLICY "Users can view their own registrations" 
ON public.marathon_registrations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own registrations" 
ON public.marathon_registrations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own registrations" 
ON public.marathon_registrations 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Cricket tournament registrations table
CREATE TABLE public.cricket_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  team_name TEXT NOT NULL,
  captain_name TEXT NOT NULL,
  captain_phone TEXT NOT NULL,
  team_jersey_url TEXT,
  amount_paid DECIMAL(10,2) NOT NULL DEFAULT 2000,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_id TEXT,
  registration_status TEXT DEFAULT 'active' CHECK (registration_status IN ('active', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.cricket_registrations ENABLE ROW LEVEL SECURITY;

-- Cricket registrations policies
CREATE POLICY "Users can view their own cricket registrations" 
ON public.cricket_registrations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own cricket registrations" 
ON public.cricket_registrations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cricket registrations" 
ON public.cricket_registrations 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Cricket team players table
CREATE TABLE public.cricket_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID REFERENCES public.cricket_registrations(id) ON DELETE CASCADE,
  player_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  phone TEXT NOT NULL,
  photo_url TEXT,
  player_position INTEGER NOT NULL CHECK (player_position BETWEEN 1 AND 9),
  is_substitute BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.cricket_players ENABLE ROW LEVEL SECURITY;

-- Cricket players policies
CREATE POLICY "Users can view players for their registrations" 
ON public.cricket_players 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.cricket_registrations cr 
    WHERE cr.id = cricket_players.registration_id 
    AND cr.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create players for their registrations" 
ON public.cricket_players 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.cricket_registrations cr 
    WHERE cr.id = cricket_players.registration_id 
    AND cr.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update players for their registrations" 
ON public.cricket_players 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.cricket_registrations cr 
    WHERE cr.id = cricket_players.registration_id 
    AND cr.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete players for their registrations" 
ON public.cricket_players 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.cricket_registrations cr 
    WHERE cr.id = cricket_players.registration_id 
    AND cr.user_id = auth.uid()
  )
);

-- Contact form submissions table
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (public access for contact form)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Contact submissions policies (allow anyone to insert, only admins to view)
CREATE POLICY "Anyone can submit contact form" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Event announcements table for general events
CREATE TABLE public.event_announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('marathon', 'cricket', 'general', 'workshop')),
  event_date DATE,
  registration_opens_at TIMESTAMP WITH TIME ZONE,
  registration_closes_at TIMESTAMP WITH TIME ZONE,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  location TEXT,
  entry_fee DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.event_announcements ENABLE ROW LEVEL SECURITY;

-- Event announcements policies (public read access)
CREATE POLICY "Events are viewable by everyone" 
ON public.event_announcements 
FOR SELECT 
USING (is_active = TRUE);

-- Payment tracking table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  registration_type TEXT NOT NULL CHECK (registration_type IN ('marathon', 'cricket')),
  registration_id UUID NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_method TEXT,
  payment_gateway_id TEXT,
  payment_gateway_response JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Payments policies
CREATE POLICY "Users can view their own payments" 
ON public.payments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payments" 
ON public.payments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marathon_registrations_updated_at
  BEFORE UPDATE ON public.marathon_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cricket_registrations_updated_at
  BEFORE UPDATE ON public.cricket_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_event_announcements_updated_at
  BEFORE UPDATE ON public.event_announcements
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to generate registration numbers
CREATE OR REPLACE FUNCTION public.generate_registration_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
  year_suffix TEXT;
BEGIN
  year_suffix := TO_CHAR(NOW(), 'YY');
  new_number := 'WGX' || year_suffix || LPAD((EXTRACT(EPOCH FROM NOW())::BIGINT % 100000)::TEXT, 5, '0');
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate registration numbers for marathon
CREATE OR REPLACE FUNCTION public.set_marathon_registration_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.registration_number IS NULL THEN
    NEW.registration_number := public.generate_registration_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_marathon_registration_number_trigger
  BEFORE INSERT ON public.marathon_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.set_marathon_registration_number();

-- Create indexes for better performance
CREATE INDEX idx_marathon_registrations_user_id ON public.marathon_registrations(user_id);
CREATE INDEX idx_marathon_registrations_race_type ON public.marathon_registrations(race_type);
CREATE INDEX idx_marathon_registrations_status ON public.marathon_registrations(registration_status);
CREATE INDEX idx_cricket_registrations_user_id ON public.cricket_registrations(user_id);
CREATE INDEX idx_cricket_players_registration_id ON public.cricket_players(registration_id);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_event_announcements_type ON public.event_announcements(event_type);
CREATE INDEX idx_event_announcements_active ON public.event_announcements(is_active);
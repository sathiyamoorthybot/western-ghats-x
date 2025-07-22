-- Create user profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('marathon', 'cricket', 'other')),
  event_date DATE NOT NULL,
  location TEXT,
  registration_fee DECIMAL(10,2),
  registration_open BOOLEAN DEFAULT true,
  max_participants INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for events (public read, admin write)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by everyone" 
ON public.events 
FOR SELECT 
USING (true);

-- Create marathon registrations table
CREATE TABLE public.marathon_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  registration_type TEXT NOT NULL CHECK (registration_type IN ('individual', 'group')),
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT,
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.marathon_registrations ENABLE ROW LEVEL SECURITY;

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

-- Create marathon participants table
CREATE TABLE public.marathon_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id UUID NOT NULL REFERENCES public.marathon_registrations(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 16 AND age <= 80),
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  tshirt_size TEXT NOT NULL CHECK (tshirt_size IN ('xs', 's', 'm', 'l', 'xl', 'xxl')),
  blood_group TEXT NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  emergency_contact TEXT NOT NULL,
  emergency_phone TEXT NOT NULL,
  race_type TEXT NOT NULL CHECK (race_type IN ('5k', '10k', 'half-marathon')),
  bib_number INTEGER UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.marathon_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view participants in their registrations" 
ON public.marathon_participants 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.marathon_registrations mr 
    WHERE mr.id = marathon_participants.registration_id 
    AND mr.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create participants for their registrations" 
ON public.marathon_participants 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.marathon_registrations mr 
    WHERE mr.id = marathon_participants.registration_id 
    AND mr.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update participants in their registrations" 
ON public.marathon_participants 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.marathon_registrations mr 
    WHERE mr.id = marathon_participants.registration_id 
    AND mr.user_id = auth.uid()
  )
);

-- Create cricket teams table
CREATE TABLE public.cricket_teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  team_name TEXT NOT NULL,
  captain_name TEXT NOT NULL,
  captain_phone TEXT NOT NULL,
  team_jersey_url TEXT,
  registration_fee DECIMAL(10,2) NOT NULL DEFAULT 2000,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT,
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cricket_teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own teams" 
ON public.cricket_teams 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own teams" 
ON public.cricket_teams 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own teams" 
ON public.cricket_teams 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create cricket players table
CREATE TABLE public.cricket_players (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES public.cricket_teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  phone TEXT NOT NULL,
  photo_url TEXT,
  player_type TEXT NOT NULL DEFAULT 'playing' CHECK (player_type IN ('playing', 'substitute')),
  jersey_number INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cricket_players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view players in their teams" 
ON public.cricket_players 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.cricket_teams ct 
    WHERE ct.id = cricket_players.team_id 
    AND ct.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create players for their teams" 
ON public.cricket_players 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.cricket_teams ct 
    WHERE ct.id = cricket_players.team_id 
    AND ct.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update players in their teams" 
ON public.cricket_players 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.cricket_teams ct 
    WHERE ct.id = cricket_players.team_id 
    AND ct.user_id = auth.uid()
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marathon_registrations_updated_at
  BEFORE UPDATE ON public.marathon_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marathon_participants_updated_at
  BEFORE UPDATE ON public.marathon_participants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cricket_teams_updated_at
  BEFORE UPDATE ON public.cricket_teams
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cricket_players_updated_at
  BEFORE UPDATE ON public.cricket_players
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial events
INSERT INTO public.events (name, description, event_type, event_date, location, registration_fee) VALUES
('Kattanji Hills Marathon 2025', 'Conquer the Hills. Experience the Trail. Run for Nature.', 'marathon', '2025-12-15', 'Kattanji Hills, Coimbatore', 500),
('Saravanampatti Blasters League', 'A One-Day Turf Cricket Showdown', 'cricket', '2025-08-31', 'Ten Sports Turf, Saravanampatti', 2000);
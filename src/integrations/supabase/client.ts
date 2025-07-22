// src/integrations/supabase/client.ts

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types'; // You can skip this if you're not using typed DB

const SUPABASE_URL = "https://xzppribyovslacpmrqdc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cHByaWJ5b3ZzbGFjcG1ycWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxOTc3MTAsImV4cCI6MjA2ODc3MzcxMH0.6QFrx3BWAgyqk2EnCqmr4jegMDf-dwXzAE-aBxOKbks";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

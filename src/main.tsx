// index.tsx or main.tsx
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from './utils/supabaseClient'; // Adjust path if needed

createRoot(document.getElementById('root')!).render(
  <SessionContextProvider supabaseClient={supabase}>
    <App />
  </SessionContextProvider>
);

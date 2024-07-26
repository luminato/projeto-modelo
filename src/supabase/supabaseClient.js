// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Acessando as variáveis de ambiente
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verifique se as variáveis de ambiente estão carregadas corretamente
//console.log("SUPABASE_URL:", SUPABASE_URL);
//console.log("SUPABASE_ANON_KEY:", SUPABASE_ANON_KEY);

// Crie o cliente Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;

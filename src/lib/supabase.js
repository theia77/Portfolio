import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.warn(
    "Supabase env vars are missing (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). " +
      "Copy .env.example to .env.local and fill in your project's values."
  );
}

export const supabase = url && anonKey ? createClient(url, anonKey) : null;

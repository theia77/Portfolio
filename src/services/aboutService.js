import { supabase } from "../lib/supabase.js";

/**
 * The single active About record. If more than one row has
 * is_active = true, the most recently updated one wins.
 */
export async function fetchAbout() {
  if (!supabase) return { data: null, error: new Error("Supabase not configured") };

  const { data, error } = await supabase
    .from("about")
    .select("*")
    .eq("is_active", true)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return { data, error };
}

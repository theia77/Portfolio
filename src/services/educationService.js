import { supabase } from "../lib/supabase.js";

/** All education entries, in editor-controlled order. */
export async function fetchEducation() {
  if (!supabase) return { data: [], error: new Error("Supabase not configured") };

  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("sort_order", { ascending: true });

  return { data: data ?? [], error };
}

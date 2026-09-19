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

/**
 * Admin-only: create or update the About record. Pass the existing row's
 * `id` to update it; omit it (or pass null) to insert the first one.
 */
export async function saveAbout(id, patch) {
  if (!supabase) return { data: null, error: new Error("Supabase not configured") };

  const payload = { ...patch, is_active: true, updated_at: new Date().toISOString() };

  const query = id
    ? supabase.from("about").update(payload).eq("id", id)
    : supabase.from("about").insert(payload);

  const { data, error } = await query.select().maybeSingle();
  return { data, error };
}

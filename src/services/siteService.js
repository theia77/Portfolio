import { supabase } from "../lib/supabase.js";

/**
 * Site-wide settings (name, tagline, intro, resume link, etc). A single
 * row (id = 1) — edit it directly in the Supabase table editor.
 */
export async function fetchSiteSettings() {
  if (!supabase) return { data: null, error: new Error("Supabase not configured") };

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  return { data, error };
}

/** Admin-only: update the single site_settings row (id = 1). */
export async function updateSiteSettings(patch) {
  if (!supabase) return { data: null, error: new Error("Supabase not configured") };

  const { data, error } = await supabase
    .from("site_settings")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", 1)
    .select()
    .maybeSingle();

  return { data, error };
}

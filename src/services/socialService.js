import { supabase } from "../lib/supabase.js";

/** Social/contact links, in editor-controlled order. */
export async function fetchSocialLinks() {
  if (!supabase) return { data: [], error: new Error("Supabase not configured") };

  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .order("sort_order", { ascending: true });

  return { data: data ?? [], error };
}

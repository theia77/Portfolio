import { supabase } from "../lib/supabase.js";

/** All projects, in editor-controlled order. */
export async function fetchProjects() {
  if (!supabase) return { data: [], error: new Error("Supabase not configured") };

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  return { data: data ?? [], error };
}

/** A single project by slug, for the (optional) project detail route. */
export async function fetchProjectBySlug(slug) {
  if (!supabase) return { data: null, error: new Error("Supabase not configured") };

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  return { data, error };
}

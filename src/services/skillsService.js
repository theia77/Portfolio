import { supabase } from "../lib/supabase.js";
import { createCrudService } from "./crudHelpers.js";

/** Raw skill rows (id, group_name, skill_name, sort_order) — for the admin editor. */
export async function fetchSkillRows() {
  if (!supabase) return { data: [], error: new Error("Supabase not configured") };

  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });

  return { data: data ?? [], error };
}

export const skillsCrud = createCrudService("skills");

/**
 * Skills grouped by `group_name`, each group's items in editor-controlled
 * order. Returns [{ group: string, items: string[] }].
 */
export async function fetchSkillGroups() {
  if (!supabase) return { data: [], error: new Error("Supabase not configured") };

  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) return { data: [], error };

  const groups = new Map();
  for (const row of data) {
    if (!groups.has(row.group_name)) groups.set(row.group_name, []);
    groups.get(row.group_name).push(row.skill_name);
  }

  return { data: Array.from(groups, ([group, items]) => ({ group, items })), error: null };
}

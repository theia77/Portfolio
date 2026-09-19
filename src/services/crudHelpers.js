import { supabase } from "../lib/supabase.js";

function notConfigured() {
  return { data: null, error: new Error("Supabase not configured") };
}

/**
 * Generic insert/update/delete/reorder for the simple list-based content
 * tables (education, projects, skills, social_links) — they all share
 * the same shape: a uuid `id`, an admin-editable `sort_order`, and plain
 * public-read / admin-write RLS. Table-specific read queries stay in
 * their own service files; this only covers the CRUD half.
 */
export function createCrudService(table) {
  return {
    async create(row) {
      if (!supabase) return notConfigured();
      const { data, error } = await supabase.from(table).insert(row).select().maybeSingle();
      return { data, error };
    },

    async update(id, patch) {
      if (!supabase) return notConfigured();
      const { data, error } = await supabase
        .from(table)
        .update(patch)
        .eq("id", id)
        .select()
        .maybeSingle();
      return { data, error };
    },

    async remove(id) {
      if (!supabase) return { error: new Error("Supabase not configured") };
      const { error } = await supabase.from(table).delete().eq("id", id);
      return { error };
    },

    /** Swaps sort_order between two rows (adjacent, for a move up/down). */
    async swapOrder(a, b) {
      if (!supabase) return { error: new Error("Supabase not configured") };
      const [first, second] = await Promise.all([
        supabase.from(table).update({ sort_order: b.sort_order }).eq("id", a.id),
        supabase.from(table).update({ sort_order: a.sort_order }).eq("id", b.id),
      ]);
      return { error: first.error || second.error || null };
    },
  };
}

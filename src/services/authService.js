import { supabase } from "../lib/supabase.js";

function notConfigured() {
  return { data: null, error: new Error("Supabase not configured") };
}

export async function signUp(email, password) {
  if (!supabase) return notConfigured();
  return supabase.auth.signUp({ email, password });
}

export async function signIn(email, password) {
  if (!supabase) return notConfigured();
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  if (!supabase) return { error: new Error("Supabase not configured") };
  return supabase.auth.signOut();
}

export async function getSession() {
  if (!supabase) return { data: { session: null }, error: null };
  return supabase.auth.getSession();
}

/** The current user's own profile row (id, email, role). */
export async function fetchProfile(userId) {
  if (!supabase) return notConfigured();
  return supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
}

export function onAuthStateChange(callback) {
  if (!supabase) return { data: { subscription: { unsubscribe() {} } } };
  return supabase.auth.onAuthStateChange(callback);
}

import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  getSession,
  onAuthStateChange,
  fetchProfile,
  signIn as signInRequest,
  signUp as signUpRequest,
  signOut as signOutRequest,
} from "../services/authService.js";

const AuthContext = createContext(null);

/**
 * Wraps the whole app so /admin can check auth state without re-fetching
 * on every route change. `isAdmin` is derived from the user's `profiles`
 * row (role = 'admin') — never from the Auth account alone, since a
 * freshly signed-up account must not be treated as an administrator.
 */
export function AuthProvider({ children }) {
  const [state, setState] = useState({
    status: "loading", // "loading" | "ready"
    user: null,
    profile: null,
  });
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    async function loadProfile(user) {
      if (!user) {
        if (mountedRef.current) setState({ status: "ready", user: null, profile: null });
        return;
      }
      const { data: profile } = await fetchProfile(user.id);
      if (mountedRef.current) setState({ status: "ready", user, profile: profile ?? null });
    }

    getSession().then(({ data }) => loadProfile(data.session?.user ?? null));

    const { data: sub } = onAuthStateChange((_event, session) => {
      loadProfile(session?.user ?? null);
    });

    return () => {
      mountedRef.current = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = {
    ...state,
    isAdmin: state.profile?.role === "admin",
    async signIn(email, password) {
      return signInRequest(email, password);
    },
    async signUp(email, password) {
      return signUpRequest(email, password);
    },
    async signOut() {
      return signOutRequest();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

/**
 * Gate for everything under /admin (except /admin/login and /admin/signup).
 * Not authenticated -> /admin/login. Authenticated but not an admin ->
 * an inline access-denied message (the account exists, it just hasn't
 * been granted admin access yet — see README for how to grant it).
 *
 * This is a UX convenience only. The real enforcement is server-side:
 * every content table's write policies check the same admin role via
 * Postgres RLS, so this route guard is not the security boundary.
 */
export function ProtectedAdminRoute({ children }) {
  const { status, user, isAdmin } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-sm text-muted">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center">
        <p className="text-xs uppercase tracking-widest2 text-accent">Access denied</p>
        <h1 className="text-2xl text-ink">This account isn&rsquo;t an administrator</h1>
        <p className="max-w-sm text-sm text-muted">
          You&rsquo;re signed in as {user.email}, but this account hasn&rsquo;t been granted
          admin access. Ask the site owner to run the setup SQL in the README, then sign in
          again.
        </p>
      </div>
    );
  }

  return children;
}

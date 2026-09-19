import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

export default function AdminLogin() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) navigate(location.state?.from || "/admin", { replace: true });
  }, [user, navigate, location.state]);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      setStatus("error");
      setError(signInError.message);
      return;
    }
    navigate(location.state?.from || "/admin", { replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm">
        <p className="text-xs uppercase tracking-widest2 text-accent">Admin</p>
        <h1 className="mt-2 text-2xl text-ink">Sign in</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-xs uppercase tracking-wide text-muted">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded border border-line/60 bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-wide text-muted">Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded border border-line/60 bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
          </label>

          {status === "error" && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded bg-accent px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === "submitting" ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-xs text-muted">
          No account?{" "}
          <Link to="/admin/signup" className="text-ink underline hover:text-accent">
            Create one
          </Link>
          . New accounts aren&rsquo;t admins by default — see the README.
        </p>
        <Link to="/" className="mt-8 block text-xs text-muted hover:text-ink">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}

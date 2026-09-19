import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

export default function AdminSignup() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | error | done
  const [error, setError] = useState("");
  const [needsEmailConfirm, setNeedsEmailConfirm] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirm) {
      setStatus("error");
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 8) {
      setStatus("error");
      setError("Password must be at least 8 characters.");
      return;
    }

    setStatus("submitting");
    setError("");

    const { data, error: signUpError } = await signUp(email, password);
    if (signUpError) {
      setStatus("error");
      setError(signUpError.message);
      return;
    }

    setNeedsEmailConfirm(!data.session);
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-6">
        <div className="max-w-sm text-center">
          <p className="text-xs uppercase tracking-widest2 text-accent">Account created</p>
          <h1 className="mt-2 text-2xl text-ink">
            {needsEmailConfirm ? "Check your email" : "You're signed up"}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {needsEmailConfirm
              ? "Confirm your email, then sign in. "
              : ""}
            New accounts aren&rsquo;t administrators by default — the site owner needs to grant
            you admin access (see the README) before you can edit content.
          </p>
          <Link
            to="/admin/login"
            className="mt-6 inline-block text-xs uppercase tracking-wide text-ink underline hover:text-accent"
          >
            Go to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm">
        <p className="text-xs uppercase tracking-widest2 text-accent">Admin</p>
        <h1 className="mt-2 text-2xl text-ink">Create account</h1>
        <p className="mt-2 text-xs text-muted">
          This creates a regular account only — it does not grant admin access by itself.
        </p>

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
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded border border-line/60 bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-wide text-muted">Confirm password</span>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1.5 w-full rounded border border-line/60 bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
          </label>

          {status === "error" && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded bg-accent px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === "submitting" ? "Creating…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-xs text-muted">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-ink underline hover:text-accent">
            Sign in
          </Link>
        </p>
        <Link to="/" className="mt-8 block text-xs text-muted hover:text-ink">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}

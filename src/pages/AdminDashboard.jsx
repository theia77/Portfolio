import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

const NAV_ITEMS = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/about", label: "About" },
  { to: "/admin/education", label: "Education" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/skills", label: "Skills" },
  { to: "/admin/contact", label: "Contact / Socials" },
  { to: "/admin/resume", label: "Resume" },
  { to: "/admin/settings", label: "Site Settings" },
];

const linkClass = ({ isActive }) =>
  `block rounded px-3 py-2 text-sm transition-colors ${
    isActive ? "bg-accent/15 text-accent" : "text-muted hover:bg-line/20 hover:text-ink"
  }`;

export default function AdminDashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="mx-auto flex max-w-6xl flex-col lg:flex-row">
        <aside className="shrink-0 border-b border-line/40 px-4 py-6 lg:w-60 lg:border-b-0 lg:border-r lg:px-4">
          <p className="px-3 text-xs uppercase tracking-widest2 text-accent">Admin</p>
          <p className="mt-1 truncate px-3 text-xs text-muted">{user?.email}</p>

          <nav className="mt-6 space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 space-y-1 border-t border-line/40 pt-4">
            <a href="/" className="block rounded px-3 py-2 text-sm text-muted hover:text-ink">
              ← View site
            </a>
            <button
              type="button"
              onClick={() => signOut()}
              className="block w-full rounded px-3 py-2 text-left text-sm text-muted hover:text-ink"
            >
              Sign out
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

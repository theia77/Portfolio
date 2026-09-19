import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Layout } from "./components/layout/Layout.jsx";
import { PageTransition } from "./components/animations/PageTransition.jsx";
import { PortfolioDataProvider } from "./hooks/usePortfolioData.jsx";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { ProtectedAdminRoute } from "./components/admin/ProtectedAdminRoute.jsx";
import { AdminOverview } from "./components/admin/AdminOverview.jsx";
import { useScrollToTop } from "./hooks/useScrollToTop.js";

import Home from "./pages/Home.jsx";

// The single-page home is the primary experience and loads eagerly.
// Everything else — the optional project-detail/404 routes and the
// entire /admin area — is rarer and split out of the main bundle.
const Project = lazy(() => import("./pages/Project.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const AdminLogin = lazy(() => import("./pages/AdminLogin.jsx"));
const AdminSignup = lazy(() => import("./pages/AdminSignup.jsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.jsx"));
const AboutEditor = lazy(() => import("./components/admin/editors/AboutEditor.jsx"));
const EducationEditor = lazy(() => import("./components/admin/editors/EducationEditor.jsx"));
const ProjectsEditor = lazy(() => import("./components/admin/editors/ProjectsEditor.jsx"));
const SkillsEditor = lazy(() => import("./components/admin/editors/SkillsEditor.jsx"));
const ContactEditor = lazy(() => import("./components/admin/editors/ContactEditor.jsx"));
const ResumeEditor = lazy(() => import("./components/admin/editors/ResumeEditor.jsx"));
const SiteSettingsEditor = lazy(() => import("./components/admin/editors/SiteSettingsEditor.jsx"));

function AdminFallback() {
  return <div className="flex min-h-screen items-center justify-center bg-bg text-sm text-muted">Loading…</div>;
}

export default function App() {
  const location = useLocation();
  useScrollToTop();

  return (
    <PortfolioDataProvider>
      <AuthProvider>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route element={<Layout />}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route
                path="/work/:slug"
                element={
                  <Suspense fallback={null}>
                    <PageTransition><Project /></PageTransition>
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={null}>
                    <PageTransition><NotFound /></PageTransition>
                  </Suspense>
                }
              />
            </Route>

            <Route
              path="/admin/login"
              element={<Suspense fallback={<AdminFallback />}><AdminLogin /></Suspense>}
            />
            <Route
              path="/admin/signup"
              element={<Suspense fallback={<AdminFallback />}><AdminSignup /></Suspense>}
            />
            <Route
              path="/admin"
              element={
                <Suspense fallback={<AdminFallback />}>
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                </Suspense>
              }
            >
              <Route index element={<AdminOverview />} />
              <Route path="about" element={<AboutEditor />} />
              <Route path="education" element={<EducationEditor />} />
              <Route path="projects" element={<ProjectsEditor />} />
              <Route path="skills" element={<SkillsEditor />} />
              <Route path="contact" element={<ContactEditor />} />
              <Route path="resume" element={<ResumeEditor />} />
              <Route path="settings" element={<SiteSettingsEditor />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </AuthProvider>
    </PortfolioDataProvider>
  );
}

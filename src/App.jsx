import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Layout } from "./components/layout/Layout.jsx";
import { PageTransition } from "./components/animations/PageTransition.jsx";
import { PortfolioDataProvider } from "./hooks/usePortfolioData.jsx";
import { useScrollToTop } from "./hooks/useScrollToTop.js";

import Home from "./pages/Home.jsx";

// The single-page home is the primary experience and loads eagerly; the
// optional project-detail and 404 routes are rarer, so they're split out
// of the main bundle.
const Project = lazy(() => import("./pages/Project.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

export default function App() {
  const location = useLocation();
  useScrollToTop();

  return (
    <PortfolioDataProvider>
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
        </Routes>
      </AnimatePresence>
    </PortfolioDataProvider>
  );
}

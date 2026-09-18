import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Layout } from "./components/layout/Layout.jsx";
import { PageTransition } from "./components/animations/PageTransition.jsx";
import { useScrollToTop } from "./hooks/useScrollToTop.js";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Education from "./pages/Education.jsx";
import Work from "./pages/Work.jsx";
import Project from "./pages/Project.jsx";
import Resume from "./pages/Resume.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const location = useLocation();
  useScrollToTop();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/education" element={<PageTransition><Education /></PageTransition>} />
          <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
          <Route path="/work/:slug" element={<PageTransition><Project /></PageTransition>} />
          <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

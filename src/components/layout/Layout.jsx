import { Outlet } from "react-router-dom";
import { Navbar } from "../navigation/Navbar.jsx";
import { Footer } from "./Footer.jsx";
import { ScrollProgressLine } from "../animations/ScrollProgressLine.jsx";
import { Cursor } from "../animations/Cursor.jsx";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>

      <ScrollProgressLine />
      <Cursor />
      <Navbar />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

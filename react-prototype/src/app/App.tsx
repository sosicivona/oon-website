import { useState, useEffect } from "react";
import { TopNav } from "./components/TopNav";
import { Footer } from "./components/Footer";
import { LandingPage } from "./pages/LandingPage";
import { OrientationPage } from "./pages/OrientationPage";
import { BrowsePage } from "./pages/BrowsePage";
import { ItemDetailPage } from "./pages/ItemDetailPage";
import { TopicPage } from "./pages/TopicPage";
import { SourcesPage } from "./pages/SourcesPage";
import { FaqPage } from "./pages/FaqPage";
import { AboutPage } from "./pages/AboutPage";
import { ThemeSwitcher, THEMES, applyTheme } from "./components/ThemeSwitcher";
import { PageShell } from "./components/PageShell";
import { StyleReferencePage } from "./pages/StyleReferencePage";

// Top nav stays: Start · Read · Timeline · Sources
// Support routes (not in top nav): faq, about
// Dev route (not in public nav or footer): style
type Page = "home" | "orientation" | "read" | "item" | "timeline" | "sources" | "faq" | "about" | "style";

const DEFAULT_THEME = "solstice";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [activeTheme, setActiveTheme] = useState(DEFAULT_THEME);
  const [pageTransition, setPageTransition] = useState(false);

  useEffect(() => {
    const theme = THEMES.find(t => t.id === DEFAULT_THEME)!;
    applyTheme(theme);
  }, []);

  const theme = THEMES.find(t => t.id === activeTheme) ?? THEMES[0];

  function navigate(page: Page) {
    // Trigger cross-fade transition
    setPageTransition(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setPageTransition(false), 50);
    }, 200);
  }

  function handleThemeChange(id: string) {
    const t = THEMES.find(th => th.id === id)!;
    applyTheme(t);
    setActiveTheme(id);
  }

  return (
    <div className={theme.isDark ? "dark" : ""} style={{ minHeight: "100vh", position: "relative" }}>
      {/* Aurora atmosphere — position:fixed, z-index:0, behind all content */}
      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          background: theme.bgGradient,
          transition: "background 0.7s ease",
        }}
      />

      {/* Content layer — transparent so aurora shows through gutters */}
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", background: "transparent", color: "var(--foreground)" }}>
        <TopNav
          currentPage={currentPage}
          onNavigate={navigate}
          darkMode={theme.isDark}
          themeSwitcher={<ThemeSwitcher activeTheme={activeTheme} onThemeChange={handleThemeChange} />}
        />
        <main style={{
          opacity: pageTransition ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}>
          {currentPage === "home"        && <LandingPage onNavigate={navigate} heroGradient={theme.heroGradient} activeTheme={activeTheme} />}
          {currentPage === "orientation" && <PageShell><OrientationPage onNavigate={navigate} activeTheme={activeTheme} /></PageShell>}
          {currentPage === "read"        && <PageShell><BrowsePage onNavigate={navigate} onSelectItem={() => navigate("item")} /></PageShell>}
          {currentPage === "item"        && <PageShell><ItemDetailPage onNavigate={navigate} /></PageShell>}
          {currentPage === "timeline"    && <PageShell><TopicPage onNavigate={navigate} onSelectItem={() => navigate("item")} /></PageShell>}
          {currentPage === "sources"     && <PageShell><SourcesPage /></PageShell>}
          {currentPage === "faq"         && <PageShell><FaqPage onNavigate={navigate} /></PageShell>}
          {currentPage === "about"       && <PageShell><AboutPage onNavigate={navigate} /></PageShell>}
          {/* ⚠ DEV ONLY — gate or remove before public release */}
          {currentPage === "style"       && <PageShell><StyleReferencePage /></PageShell>}
        </main>
        <Footer onNavigate={navigate} />
      </div>
    </div>
  );
}
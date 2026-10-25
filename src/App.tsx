import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProjectShowcase from './components/ProjectShowcase';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProcessPage from './pages/ProcessPage';
import SkillsPage from './pages/SkillsPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';

export type PortfolioTheme = 'light' | 'dark';

function HomePage() {
  return <><Hero /><ProjectShowcase limit={4} /></>;
}

export default function App() {
  const [theme, setTheme] = useState<PortfolioTheme>(() => {
    try {
      const saved = localStorage.getItem('yeshak-theme-v2');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch { /* private browsing */ }
    return 'light';
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem('yeshak-theme-v2', theme); } catch { /* storage disabled */ }
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="bg-bg min-h-screen transition-colors duration-300">
        <Navigation theme={theme} toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<main className="min-h-screen pt-36 section-padding"><h1 className="font-display text-display-md font-bold text-primary">Page not found.</h1><a href="/" className="text-accent underline">Return home</a></main>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

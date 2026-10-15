import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import About from './sections/About';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  useScrollReveal();

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-[#f4f4f5] selection:bg-accent/25 selection:text-accent">
      {/* Subtle Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Top Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>

      {/* Vercel Speed Insights (production only) */}
      {typeof window !== 'undefined' && !window.location.hostname.includes('localhost') && <SpeedInsights />}
    </div>
  );
}

export default App;

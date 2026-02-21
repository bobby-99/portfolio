import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import About from './sections/About';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import { SpeedInsights } from '@vercel/speed-insights/react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger on load and resize
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Interactive Elements */}
      <CustomCursor />

      {/* Decorative Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}

export default App;

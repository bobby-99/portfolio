import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';

export default function Navigation() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Initial fade in for nav items
    gsap.from(containerRef.current, {
      y: -20,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <nav
      ref={containerRef}
      className="fixed top-0 w-full z-40 px-6 py-6 mix-blend-difference text-white"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a
          href="#"
          className="font-display font-bold text-2xl tracking-tighter hover:opacity-70 transition-opacity"
        >
          SoumyaRanjan.
        </a>

        <div className="hidden md:flex gap-8 font-mono text-sm tracking-widest uppercase">
          <MagneticButton href="#work" className="nav-link">
            Work
          </MagneticButton>
          <MagneticButton href="#about" className="nav-link">
            About
          </MagneticButton>
          <MagneticButton href="#skills" className="nav-link">
            Skills
          </MagneticButton>
          <MagneticButton href="#contact" className="nav-link">
            Contact
          </MagneticButton>
        </div>

        <button className="md:hidden space-y-1.5 group cursor-pointer">
          <span className="block w-6 h-0.5 bg-white transition-transform group-hover:translate-x-1"></span>
          <span className="block w-4 h-0.5 bg-white transition-transform group-hover:translate-x-2"></span>
        </button>
      </div>
    </nav>
  );
}

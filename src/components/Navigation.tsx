import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';

export default function Navigation() {
  const containerRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(() => {
    // Initial fade in for nav items
    gsap.from(containerRef.current, {
      y: -20,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav
        ref={containerRef}
        className="fixed top-0 w-full z-50 px-6 py-6 mix-blend-difference text-white"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a
            href="#"
            className="font-display font-bold text-2xl tracking-tighter hover:opacity-70 transition-opacity relative z-50"
          >
            SoumyaRanjan.
          </a>

          <div className="hidden md:flex gap-8 font-mono text-sm tracking-widest uppercase">
            {['Work', 'About', 'Skills', 'Contact'].map((item) => (
              <MagneticButton key={item} href={`#${item.toLowerCase()}`} className="nav-link">
                {item}
              </MagneticButton>
            ))}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden space-y-1.5 group cursor-pointer relative z-50 p-2"
            aria-label="Toggle Menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 flex flex-col justify-center items-center transition-all duration-500 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="flex flex-col items-center gap-8">
          {['Work', 'About', 'Skills', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="font-display text-4xl font-bold text-white hover:text-gray-400 transition-colors tracking-tight"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

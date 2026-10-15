import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll progress and top-of-page reset
  useEffect(() => {
    const handleScroll = () => {
      // Clear active section when hero is in view at top of page
      if (window.scrollY < 80) {
        setActiveSection('');
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver — includes hero so nothing is active at top
  useEffect(() => {
    const allIds = ['hero', 'projects', 'about', 'skills', 'contact'];
    const sections = allIds
      .map((id) => document.getElementById(id))
      .filter((s): s is HTMLElement => Boolean(s));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id === 'hero' ? '' : id);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-80px 0px -35% 0px',
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const navItems = [
    { label: 'projects', href: '#projects', id: 'projects' },
    { label: 'about', href: '#about', id: 'about' },
    { label: 'skills', href: '#skills', id: 'skills' },
    { label: 'contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsOpen(false);
    }
  }, []);

  const cvUrl = 'https://drive.google.com/file/d/1ct11LkcfZNVKCYdC24xRfGa8VRi3jPxg/view?usp=sharing';

  return (
    <header
      className="fixed z-50 left-1/2 -translate-x-1/2
        top-4 w-[min(1200px,calc(100%-32px))] h-[60px]
        md:top-4 md:h-[60px]
        max-md:top-3 max-md:w-[calc(100%-24px)] max-md:h-14
        rounded-[14px] px-5
        flex items-center justify-between
        border border-white/[0.08]
        shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
      style={{
        background: 'rgba(12,12,14,0.78)',
        backdropFilter: 'blur(16px) saturate(140%)',
        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
      }}
    >
      {/* Clipped Scroll Progress Bar along bottom edge */}
      <div className="absolute inset-0 rounded-[14px] overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-accent transition-[width] duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Brand Logo */}
      <a
        href="#"
        className="group relative z-10 flex items-center gap-2.5 text-mono-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm shrink-0"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <span className="w-[34px] h-[34px] rounded border border-mono-800 bg-[#0E0E10] flex items-center justify-center font-mono font-bold text-xs text-accent group-hover:border-accent transition-colors">
          SD
        </span>
        <span className="font-mono text-[15px] tracking-tight text-mono-200 group-hover:text-mono-50 transition-colors hidden sm:inline">
          soumyaranjan<span className="text-accent">.backend</span>
        </span>
      </a>

      {/* Desktop Nav */}
      <nav className="relative z-10 hidden md:flex items-center gap-7 font-mono text-[13px]" aria-label="Main Navigation">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`relative py-2 px-2.5 transition-colors tracking-wide focus:outline-none focus-visible:text-accent ${
                isActive ? 'text-accent font-medium' : 'text-mono-400 hover:text-white'
              }`}
            >
              {item.label}
              {/* Active 2px orange underline */}
              {isActive && (
                <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-accent rounded-full" />
              )}
            </a>
          );
        })}

        <a
          href={cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-accent text-accent text-[13px] font-medium
            hover:bg-accent hover:text-[#0A0A0B] transition-all"
        >
          <span>CV</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10 md:hidden p-2 text-mono-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X className="w-5 h-5 text-accent" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-[calc(100%+8px)] left-0 right-0 md:hidden
            rounded-[14px] px-5 py-4
            border border-white/[0.08]
            shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          style={{
            background: 'rgba(12,12,14,0.94)',
            backdropFilter: 'blur(16px) saturate(140%)',
            WebkitBackdropFilter: 'blur(16px) saturate(140%)',
          }}
        >
          <nav className="flex flex-col gap-1 font-mono text-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`py-2.5 px-3 rounded-md transition-colors ${
                    isActive ? 'text-accent bg-accent/10 font-medium' : 'text-mono-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center justify-between py-2.5 px-3 rounded-md border border-accent text-accent hover:bg-accent hover:text-[#0A0A0B] transition-colors"
            >
              <span>Download CV</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

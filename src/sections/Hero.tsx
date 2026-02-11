import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Background elements
      tl.to('.hero-bg-1', { opacity: 0.3, duration: 1.5, ease: 'power2.out' }, 0)
        .to('.hero-bg-2', { opacity: 0.2, duration: 1.5, ease: 'power2.out' }, 0.2);

      // Text and Content
      tl.to('.hero-eyebrow', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .to(
          '.hero-line',
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power4.out',
          },
          '-=0.4'
        )
        .to(
          '.hero-desc',
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .to(
          '.hero-cta',
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .to(
          '.hero-social',
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );

      // Scroll Indicator
      tl.to('.hero-scroll', { opacity: 1, duration: 1 }, '-=0.4');

      // Parallax for text
      gsap.to('.hero-content', {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="hero-bg-1 absolute top-1/4 left-1/4 w-96 h-96 bg-mono-800 rounded-full blur-[128px] opacity-0 animate-pulse-slow"></div>
        <div className="hero-bg-2 absolute bottom-1/4 right-1/4 w-64 h-64 bg-mono-700 rounded-full blur-[96px] opacity-0 animate-float"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Text Content */}
          <div className="hero-content lg:col-span-8 space-y-8">
            <div className="overflow-hidden">
              <p className="hero-eyebrow font-mono text-mono-400 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 opacity-0 translate-y-4">
                Full-Stack Developer
              </p>
            </div>

            <h1 className="font-display font-bold text-gradient leading-[0.9] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] tracking-tight">
              Forging Digital
              <br />
              Excellence &
              <br />
              <span className="text-mono-500">Innovation</span>
            </h1>

            <div className="hero-desc max-w-xl pt-4 opacity-0 translate-y-4">
              <p className="text-mono-400 text-base sm:text-lg leading-relaxed">
                I craft complete web experiences — slick interfaces on the surface,
                solid engineering underneath. Working across the full stack with
                React, backend systems, and modern web tooling.
              </p>
            </div>

            <div className="hero-cta flex flex-wrap gap-4 pt-4 opacity-0 translate-y-4">
              <MagneticButton
                href="#work"
                className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-black font-mono text-xs sm:text-sm tracking-widest uppercase hover:bg-mono-200 transition-colors rounded-full"
              >
                View Work
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="px-6 py-3 sm:px-8 sm:py-4 border border-mono-700 font-mono text-xs sm:text-sm tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all rounded-full"
              >
                Contact Me
              </MagneticButton>
            </div>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="flex lg:flex-col gap-6 lg:gap-2 lg:text-right lg:items-end opacity-0 hero-social translate-y-4">
              <p className="font-mono text-xs text-mono-500 uppercase tracking-widest hidden lg:block">
                Connect
              </p>
              <div className="flex lg:flex-col gap-6 lg:gap-2 text-sm">
                <a
                  href="https://github.com/bobby-99"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-mono-400 transition-colors inline-block text-mono-300"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/soumyaranjan-bobby/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-mono-400 transition-colors inline-block text-mono-300"
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com/ichotu69"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-mono-400 transition-colors inline-block text-mono-300"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hero-scroll opacity-0">
          <div className="scroll-indicator w-6 h-10 border-2 border-mono-700 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

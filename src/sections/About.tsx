import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Background parallax or simple fade in
      gsap.from('.about-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 px-6 bg-mono-950 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mono-900/20 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 about-content opacity-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-mono-500 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                About Me
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground">
                Building with <span className="text-mono-500">precision</span> & <span className="text-mono-500">purpose</span>
              </h2>
              <div className="text-mono-400 text-lg leading-relaxed max-w-lg">
                <p>
                  Full-stack Developer passionate about intuitive, high-performance web experiences.
                  Specializing in React, I build accessible, pixel-perfect applications where code
                  disappears and user experience takes center stage.
                </p>
              </div>
            </div>

            {/* EXPERIENCE & EDUCATION */}
            <div className="space-y-6">
              {/* EXPERIENCE */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-display text-xl font-bold mb-4 text-foreground">Experience</h3>

                <div className="space-y-4">
                  <div className="border-l-2 border-mono-700 pl-4">
                    <p className="font-mono text-mono-500 text-xs uppercase tracking-wider mb-1">
                      2025 - 2026
                    </p>
                    <h4 className="font-display font-semibold text-base text-foreground">
                      Frontend Developer
                    </h4>
                    <p className="text-mono-500 text-sm">
                      EduNova learning ltd
                    </p>
                  </div>

                  <div className="border-l-2 border-mono-800 pl-4">
                    <p className="font-mono text-mono-500 text-xs uppercase tracking-wider mb-1">
                      2023 - 2024
                    </p>
                    <h4 className="font-display font-semibold text-base text-foreground">
                      Junior Web Dev Intern
                    </h4>
                    <p className="text-mono-500 text-sm">
                      ThinkChamp pvt lmt
                    </p>
                  </div>
                </div>
              </div>

              {/* EDUCATION */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-display text-xl font-bold mb-4 text-foreground">Education</h3>

                <div className="border-l-2 border-mono-700 pl-4">
                  <p className="font-mono text-mono-500 text-xs uppercase tracking-wider mb-1">
                    2022 - 2026
                  </p>
                  <h4 className="font-display font-semibold text-base text-foreground">
                    B.Tech. Computer Science
                  </h4>
                  <p className="text-mono-500 text-sm">
                    Siddharth Institute, Puttur
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0 sticky top-24 group">
            <div className="aspect-[3/4] w-full lg:w-96 rounded-2xl overflow-hidden bg-mono-800 relative z-20 transition-transform duration-500 group-hover:-translate-y-2">
              <img
                src="/images/about_portrait.jpg"
                alt="Profile"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-2xl"
              />
            </div>

            {/* Card Layer 1 */}
            <div className="absolute top-4 right-[-10px] w-full lg:w-96 h-full border border-mono-700 bg-mono-900/50 backdrop-blur-sm rounded-2xl z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>

            {/* Card Layer 2 */}
            <div className="absolute top-8 right-[-20px] w-full lg:w-96 h-full border border-mono-800 bg-mono-950/30 rounded-2xl z-0 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"></div>

            <div className="absolute -top-6 -right-6 w-32 h-32 bg-mono-800 rounded-full blur-2xl opacity-50 z-30 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

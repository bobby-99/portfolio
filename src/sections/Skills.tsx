import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layout, Server, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean);
      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <p className="font-mono text-mono-500 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4">
            Capabilities
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-foreground">
            Tech Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Frontend */}
          <div
            ref={(el) => {
              cardsRef.current[0] = el;
            }}
            className="glass-card p-8 rounded-2xl space-y-6 hover:border-mono-600 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-mono-800 flex items-center justify-center">
              <Layout className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GSAP'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="skill-tag px-4 py-2 bg-mono-900 border border-mono-800 rounded-full text-sm font-mono cursor-default text-mono-300"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Backend */}
          <div
            ref={(el) => {
              cardsRef.current[1] = el;
            }}
            className="glass-card p-8 rounded-2xl space-y-6 hover:border-mono-600 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-mono-800 flex items-center justify-center">
              <Server className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">Backend</h3>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Express', 'PostgreSQL', 'FastAPI', 'GraphQL'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="skill-tag px-4 py-2 bg-mono-900 border border-mono-800 rounded-full text-sm font-mono cursor-default text-mono-300"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Tools */}
          <div
            ref={(el) => {
              cardsRef.current[2] = el;
            }}
            className="glass-card p-8 rounded-2xl space-y-6 hover:border-mono-600 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-mono-800 flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {['Git', 'Docker', 'Figma', 'AWS', 'Vercel'].map((tech) => (
                <span
                  key={tech}
                  className="skill-tag px-4 py-2 bg-mono-900 border border-mono-800 rounded-full text-sm font-mono cursor-default text-mono-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

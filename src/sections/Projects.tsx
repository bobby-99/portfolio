import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Orbit View',
    category: 'Productivity Dashboard',
    image: '/images/project_orbit.jpg',
    tech: 'React • Node.js • PostgreSQL',
    year: '2024',
    link: '#',
  },
  {
    id: 2,
    title: 'Task Manager',
    category: 'SaaS Platform',
    image: '/images/project_taskmanager.jpg',
    tech: 'PostgreSQL • Express • React',
    year: '2024',
    link: '#',
  },
  {
    id: 3,
    title: 'Playlist DJ',
    category: 'Social Audio App',
    image: '/images/project_playlist.jpg',
    tech: 'Socket.io • Redis • Spotify API',
    year: '2023',
    link: '#',
  },
  {
    id: 4,
    title: 'DevLup: Internship Aggregator',
    category: 'Full-Stack Platform',
    image: '/images/project_internship_aggregator.jpg',
    tech: 'React • Node.js • PostgreSQL • Playwright',
    year: '2025',
    link: '#',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean);

      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: (index % 2) * 0.1,
          ease: 'power3.out',
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="work" ref={sectionRef} className="py-20 md:py-32 px-6 relative bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 md:mb-20">
          <div>
            <p className="font-mono text-mono-500 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4">
              Selected Works
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-foreground">
              Projects
            </h2>
          </div>
          <div className="hidden md:block">
            <span className="font-mono text-mono-600 text-sm">
              01 — 0{projects.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <a
              key={project.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card group cursor-pointer block ${index % 2 === 1 ? 'md:mt-24' : ''
                }`}
              data-cursor="hover"
            >
              <div className="overflow-hidden rounded-3xl mb-6 bg-mono-900 aspect-[16/10] relative mx-4">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full h-full object-cover transition-transform duration-700 rounded-3xl"
                />
                <div className="absolute bottom-6 left-6 z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <MagneticButton className="px-3 py-1 bg-white text-black text-xs font-mono uppercase tracking-wider rounded-full pointer-events-none">
                    View Project
                  </MagneticButton>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-mono-300 transition-colors text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-mono-500 text-sm">{project.tech}</p>
                </div>
                <span className="font-mono text-mono-600 text-xs">
                  {project.year}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    github: 'https://www.github.com/bobby-99/orbit-view',
    live: '',
    description: 'A comprehensive productivity dashboard designed to help users track their goals and manage their daily workflows visually.',
  },
  {
    id: 2,
    title: 'Tasks',
    category: 'SaaS Platform',
    image: '/images/project_taskmanager.jpg',
    tech: 'PostgreSQL • Express • React',
    year: '2024',
    github: 'https://www.github.com/bobby-99/tasks',
    live: '',
    description: 'A robust SaaS platform for task management, enabling seamless collaboration and project organization.',
  },
  {
    id: 3,
    title: 'Jam Session',
    category: 'Social Audio App',
    image: '/images/project_playlist.jpg',
    tech: 'Socket.io • Redis • Spotify API',
    year: '2023',
    github: 'https://www.github.com/bobby-99/jam-session',
    live: '',
    description: 'A social audio application that allows users to create collaborative playlists and share music synchronously using the Spotify API.',
  },
  {
    id: 4,
    title: 'DevLup: Internship Aggregator',
    category: 'Full-Stack Platform',
    image: '/images/project_internship_aggregator.jpg',
    tech: 'React • Node.js • PostgreSQL • Playwright',
    year: '2025',
    github: '',
    live: '',
    description: 'An internship aggregator platform that automatically scrapes and curates software engineering internship opportunities.',
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
    <section id="work" ref={sectionRef} className="min-h-screen flex flex-col justify-center py-20 md:py-32 px-6 relative bg-background">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`project-card group block will-change-transform ${index % 2 === 1 ? 'md:mt-24' : ''
                }`}
            >
              <div className="overflow-hidden rounded-3xl mb-6 bg-mono-900 aspect-[16/10] relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-3xl"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-3xl font-bold group-hover:text-mono-300 transition-colors text-foreground">
                    {project.title}
                  </h3>
                </div>

                <p className="text-mono-500 text-sm font-mono mb-6">
                  {project.tech}
                </p>

                <div className="flex gap-4 mb-6">
                  {project.github ? (
                    <MagneticButton href={project.github} className="px-5 py-2 text-xs font-mono uppercase tracking-wider rounded-full border border-mono-700 hover:border-white transition-colors">
                      GitHub
                    </MagneticButton>
                  ) : (
                    <button disabled className="px-5 py-2 text-xs font-mono uppercase tracking-wider rounded-full border border-mono-800 text-mono-600 cursor-not-allowed">
                      GitHub
                    </button>
                  )}
                  {project.live ? (
                    <MagneticButton href={project.live} className="px-5 py-2 text-xs font-mono uppercase tracking-wider rounded-full bg-white text-black hover:bg-mono-200 transition-colors">
                      Live
                    </MagneticButton>
                  ) : (
                    <button disabled className="px-5 py-2 text-xs font-mono uppercase tracking-wider rounded-full bg-mono-900 text-mono-600 cursor-not-allowed">
                      Live
                    </button>
                  )}
                </div>

                <p className="text-mono-400 text-sm leading-relaxed max-w-lg">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    category: 'Personal Resource Planning Dashboard',
    image: '/images/project_orbit.jpg',
    tech: 'React • Django REST • PostgreSQL',
    year: '2024',
    github: 'https://www.github.com/bobby-99/orbit-view',
    live: '',
    description: 'Engineered a modular full-stack dashboard unifying tasks, expenses, health, and habits for a holistic personal data overview. Features a scalable Django REST backend, responsive hybrid navigation, and a custom analytics engine using Recharts for comprehensive data filtering.',
  },
  {
    id: 2,
    title: 'Tasks',
    category: 'Kanban Productivity App',
    image: '/images/project_taskmanager.jpg',
    tech: 'Next.js • Firebase • dnd-kit',
    year: '2024',
    github: 'https://www.github.com/bobby-99/tasks',
    live: '',
    description: 'Developed a kanban-style productivity application featuring seamless drag-and-drop functionality with Next.js, Firebase, and TailwindCSS. Implemented a structured task lifecycle with real-time state synchronization via Firestore, ensuring complete and robust data consistency.',
  },
  {
    id: 3,
    title: 'Jam Session',
    category: 'Real-Time Collaborative Playlist Platform',
    image: '/images/project_playlist.jpg',
    tech: 'React • Node.js • Socket.IO',
    year: '2023',
    github: 'https://www.github.com/bobby-99/jam-session',
    live: '',
    description: 'Designed a real-time collaborative playlist platform using React, Node.js, and Socket.IO. Engineered a deterministic vote-based queue ranking system to ensure concurrency-safe playback, fully backed by a containerized PostgreSQL database and robust JWT authorization boundaries.',
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
    description: 'An internship aggregator platform that automatically scrapes and curates software engineering internship opportunities, providing students with a centralized hub for intuitively discovering and tracking relevant career openings.',
  },
  {
    id: 5,
    title: 'CropSmart',
    category: 'Smart Crop Yield Suggestion System',
    image: '/images/project_cropsmart.jpg',
    tech: 'HTML • CSS • JavaScript',
    year: '2024',
    github: '',
    live: '',
    description: 'Created a smart crop yield suggestion system to assist farmers in making optimal decisions based on soil nutrients and weather conditions. Offers personalized fertilizer recommendations and crop analysis through a responsive, JS-powered interface with secure authentication.',
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="project-card group block will-change-transform"
            >
              <div className="overflow-hidden rounded-3xl mb-6 bg-mono-900 aspect-[16/10] relative">
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
                      Demo
                    </MagneticButton>
                  ) : (
                    <button disabled className="px-5 py-2 text-xs font-mono uppercase tracking-wider rounded-full bg-mono-900 text-mono-600 cursor-not-allowed">
                      Demo
                    </button>
                  )}
                </div>

                <p className="text-mono-400 text-sm leading-relaxed">
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

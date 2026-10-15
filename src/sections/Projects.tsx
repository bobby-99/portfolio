import { ExternalLink, Github } from 'lucide-react';

interface Project {
  index: string;
  name: string;
  category: string;
  tech: string[];
  outcome: string;
  githubUrl: string;
  liveUrl?: string;
  isPrimary?: boolean;
}

const projects: Project[] = [
  {
    index: '01',
    name: 'EV-Connect',
    category: 'Backend // Geospatial',
    tech: ['Java 17', 'Spring Boot 3', 'PostgreSQL', 'React 19', 'OSRM'],
    outcome: 'Routes drivers to optimal charging stations using Spring Boot and OSRM distance matrix.',
    githubUrl: 'https://github.com/bobby-99/EV-Connect',
    liveUrl: 'https://ev-volt-link.vercel.app',
    isPrimary: true,
  },
  {
    index: '02',
    name: 'Wiser',
    category: 'Backend // Auth & Ledger',
    tech: ['Java', 'Spring Boot 3', 'Spring Security', 'PostgreSQL', 'JWT'],
    outcome: 'Secures financial transactions and calculates JPQL category aggregations via Spring Security JWT.',
    githubUrl: 'https://github.com/bobby-99/financial_management_system',
  },
  {
    index: '03',
    name: 'VM Interaction via Hand Gestures',
    category: 'Computer Vision // Cloud Control',
    tech: ['Python', 'FastAPI', 'MediaPipe', 'OpenCV', 'AWS EC2'],
    outcome: 'Executes programmatic AWS EC2 lifecycle actions from MediaPipe gestures via async FastAPI.',
    githubUrl: 'https://github.com/bobby-99/Gesture_Control',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 border-t border-mono-800/80 bg-[#0E0E10] relative">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="mb-14">
          <p className="font-mono text-accent text-xs tracking-widest uppercase mb-2 reveal-init">
            // 01 — projects
          </p>
          <div className="mask-wrapper">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-mono-100 mask-inner">
              Shipped Systems
            </h2>
          </div>
        </div>

        {/* Editorial Numbered List */}
        <div className="border-b border-mono-800/80" role="list">
          {projects.map((project, idx) => (
            <div
              key={project.index}
              role="listitem"
              tabIndex={0}
              style={{ transitionDelay: `${idx * 85}ms` }}
              className={`reveal-init group relative border-t border-mono-800/80 py-8 lg:py-10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                project.isPrimary ? 'bg-accent/[0.015]' : ''
              }`}
            >
              {/* Accent line draw on hover */}
              <div
                className="absolute top-0 left-0 h-[1.5px] w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full group-focus-visible:w-full"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left: Index & Main Info */}
                <div className="lg:col-span-8 flex items-start gap-5 sm:gap-8">
                  {/* Large mono index */}
                  <span className="font-mono text-2xl sm:text-3xl font-medium text-mono-500 group-hover:text-accent transition-colors shrink-0 select-none pt-1">
                    {project.index}
                  </span>

                  <div className="space-y-2">
                    {/* Category Tag */}
                    <p className="font-mono text-[11px] text-accent tracking-wider uppercase">
                      {project.category}
                    </p>

                    {/* Project Name */}
                    <h3
                      className={`font-serif font-semibold text-mono-100 tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-2 ${
                        project.isPrimary
                          ? 'text-3xl sm:text-4xl md:text-5xl'
                          : 'text-2xl sm:text-3xl md:text-4xl'
                      }`}
                    >
                      {project.name}
                    </h3>

                    {/* Single outcome line */}
                    <p className="text-mono-300 text-sm sm:text-base leading-relaxed pt-1 max-w-2xl">
                      {project.outcome}
                    </p>

                    {/* Tech tags — moved under outcome */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#141418] text-mono-300 border border-mono-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Links only (4 cols), top-aligned */}
                <div className="lg:col-span-4 flex lg:flex-col lg:items-end gap-3 lg:pt-1">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs bg-mono-900 border border-mono-700 text-mono-200 hover:border-accent hover:text-accent transition-colors"
                    aria-label={`${project.name} source code on GitHub`}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded font-mono text-xs bg-accent text-mono-950 font-semibold hover:bg-accent-hover transition-colors shadow-sm"
                      aria-label={`${project.name} live demo`}
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

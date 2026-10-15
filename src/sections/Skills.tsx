export default function Skills() {
  const backendSkills = [
    'Core Java',
    'Spring Boot 3',
    'Hibernate / JPA',
    'REST APIs',
    'PostgreSQL',
    'SQL',
  ];

  const frontendSkills = ['React', 'Tailwind CSS'];
  const toolsSkills = ['Docker', 'AWS (EC2/Boto3)', 'Maven', 'Git'];

  return (
    <section id="skills" className="py-24 border-t border-mono-800/80 bg-[#0E0E10] relative">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full">
        {/* 12-column grid: left 4 = label + heading (sticky), right 8 = content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column — 4 cols, sticky */}
          <div className="lg:col-span-4 lg:sticky lg:top-[120px] lg:self-start">
            <p className="font-mono text-accent text-xs tracking-widest uppercase mb-2 reveal-init">
              // 03 — skills
            </p>
            <div className="mask-wrapper">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.8rem] font-semibold text-mono-100 mask-inner leading-tight">
                Technical Capabilities
              </h2>
            </div>
          </div>

          {/* Right Column — 8 cols */}
          <div className="lg:col-span-8 space-y-10">
            {/* Backend Row (Visually Dominant) */}
            <div className="space-y-4 reveal-init">
              <p className="font-mono text-xs text-accent uppercase tracking-wider">
                // backend
              </p>

              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {backendSkills.map((skill, idx) => (
                  <span
                    key={skill}
                    style={{ transitionDelay: `${idx * 60}ms` }}
                    className="px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium border border-accent/40 bg-accent/[0.08] text-mono-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/15 cursor-default shadow-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Secondary Rows */}
            <div className="pt-6 border-t border-mono-800/60 space-y-4 reveal-init" style={{ transitionDelay: '150ms' }}>
              {/* Frontend */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 font-mono text-xs sm:text-sm">
                <span className="text-mono-400 uppercase tracking-wider text-xs shrink-0 w-36">
                  Frontend:
                </span>
                <p className="text-mono-300">
                  {frontendSkills.join(' · ')}
                </p>
              </div>

              {/* Tools */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 font-mono text-xs sm:text-sm">
                <span className="text-mono-400 uppercase tracking-wider text-xs shrink-0 w-36">
                  Tools & DevOps:
                </span>
                <p className="text-mono-300">
                  {toolsSkills.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

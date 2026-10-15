import { useState } from 'react';

export default function About() {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="about" className="py-24 border-t border-mono-800/80 bg-[#0A0A0B] relative">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full">
        {/* 12-column grid: left 4 = label + heading + photo (sticky), right 8 = content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column — 4 cols, sticky on desktop */}
          <div className="lg:col-span-4 lg:sticky lg:top-[120px] lg:self-start space-y-6">
            <div>
              <p className="font-mono text-accent text-xs tracking-widest uppercase mb-2 reveal-init">
                // 02 — background
              </p>
              <div className="mask-wrapper">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.8rem] font-semibold text-mono-100 mask-inner leading-tight">
                  About &amp; Experience
                </h2>
              </div>
            </div>

            {/* Photo — inside left column */}
            <div className="reveal-init w-52 sm:w-56 rounded-lg overflow-hidden border border-mono-800 bg-[#0d0d11] p-2" style={{ transitionDelay: '120ms' }}>
              <div className="aspect-[4/5] rounded overflow-hidden bg-mono-900 relative flex items-center justify-center">
                {!imageError ? (
                  <picture>
                    <source srcSet="/images/portfolio-portrait.webp" type="image/webp" />
                    <img
                      src="/images/portfolio-portrait.png"
                      alt="Soumyaranjan Dandapat"
                      width={224}
                      height={280}
                      loading="lazy"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
                    />
                  </picture>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#0d0d11]">
                    <div className="w-16 h-16 rounded-xl border border-accent/40 bg-accent/10 flex items-center justify-center mb-3">
                      <span className="font-mono text-2xl font-bold text-accent">SD</span>
                    </div>
                    <p className="font-mono text-xs text-mono-400 text-center">
                      Soumyaranjan Dandapat
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column — 8 cols */}
          <div className="lg:col-span-8 space-y-10">
            {/* 2-Sentence Bio */}
            <div className="reveal-init">
              <p className="text-mono-200 text-base sm:text-lg leading-relaxed max-w-2xl">
                I am a backend engineer and 2026 Computer Science (AI &amp; ML) graduate from Siddharth
                Institute of Engineering and Technology. I specialize in Java and Spring Boot
                services, designing REST APIs and relational database architectures with PostgreSQL.
              </p>
            </div>

            {/* Experience */}
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-accent mb-4 reveal-init">
                // experience
              </p>

              <div className="border-l border-mono-800 pl-5 space-y-6 relative ml-1.5">
                {/* EduNova */}
                <div className="relative reveal-init" style={{ transitionDelay: '70ms' }}>
                  <span className="absolute -left-[25px] top-1.5 w-2 h-2 rounded-full bg-accent" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-serif text-lg font-semibold text-mono-100">
                      Frontend Developer
                    </h3>
                    <span className="font-mono text-xs text-mono-400">2025 – 2026</span>
                  </div>
                  <p className="font-mono text-xs text-mono-400">EduNova</p>
                </div>

                {/* ThinkChamp */}
                <div className="relative reveal-init" style={{ transitionDelay: '140ms' }}>
                  <span className="absolute -left-[25px] top-1.5 w-2 h-2 rounded-full bg-accent" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-serif text-lg font-semibold text-mono-100">
                      Junior Web Developer Intern
                    </h3>
                    <span className="font-mono text-xs text-mono-400">2023 – 2024</span>
                  </div>
                  <p className="font-mono text-xs text-mono-400">ThinkChamp Pvt. Ltd.</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-accent mb-4 reveal-init">
                // education
              </p>

              <div className="border-l border-mono-800 pl-5 space-y-6 relative ml-1.5">
                <div className="relative reveal-init" style={{ transitionDelay: '210ms' }}>
                  <span className="absolute -left-[25px] top-1.5 w-2 h-2 rounded-full bg-accent" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-serif text-lg font-semibold text-mono-100">
                      B.Tech in Computer Science &amp; Engineering (AI &amp; ML)
                    </h3>
                    <span className="font-mono text-xs text-mono-400">2022 – 2026</span>
                  </div>
                  <p className="font-mono text-xs text-mono-400">
                    Siddharth Institute of Engineering and Technology ·{' '}
                    <span className="text-accent font-medium">8.1 CGPA</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

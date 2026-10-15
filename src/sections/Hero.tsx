import { useState } from 'react';
import { ArrowDown, Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import ApiConsole from '../components/ApiConsole';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('soumyaranjan.bobby@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden bg-[#0A0A0B]">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-accent/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Copy & CTA */}
          <div className="lg:col-span-6 space-y-6">
            {/* Step 1: Meta label */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded border border-mono-800 bg-[#0E0E10] text-mono-300 font-mono text-xs tracking-wider uppercase opacity-0 animate-[fadeUp_0.4s_ease-out_forwards]"
            >
              <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
              <span>Backend Engineer · Java · Spring Boot</span>
            </div>

            {/* Step 2: Name in slide-up mask */}
            <div className="mask-wrapper">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-semibold tracking-tight text-mono-100 leading-[1.08] translate-y-[105%] animate-[slideUp_0.5s_cubic-bezier(0.16,1,0.3,1)_0.12s_forwards]">
                Soumyaranjan Dandapat
              </h1>
            </div>

            {/* Step 3: Factual sharp line */}
            <p className="text-mono-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal opacity-0 animate-[fadeUp_0.4s_ease-out_0.26s_forwards]">
              I build Spring Boot services: REST APIs, PostgreSQL, JWT auth.
            </p>

            {/* Step 4: CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 opacity-0 animate-[fadeUp_0.4s_ease-out_0.38s_forwards]">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded font-mono text-xs font-medium uppercase tracking-wider bg-accent text-mono-950 hover:bg-accent-hover transition-colors shadow-sm flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
              >
                <span>View Projects</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-5 py-2.5 rounded font-mono text-xs uppercase tracking-wider border border-mono-800 bg-mono-900/70 text-mono-200 hover:border-mono-600 hover:text-white transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={copied ? "Copied" : "Copy Email"}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-accent" />
                    <span className="text-accent font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-mono-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href="#contact"
                className="px-4 py-2.5 rounded font-mono text-xs uppercase tracking-wider text-mono-400 hover:text-mono-200 transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </a>
            </div>

            {/* Step 5: Social Links */}
            <div className="flex items-center gap-4 pt-4 text-mono-400 border-t border-mono-800/80 max-w-md opacity-0 animate-[fadeUp_0.4s_ease-out_0.48s_forwards]">
              <span className="font-mono text-xs text-mono-400 uppercase tracking-widest">Connect:</span>
              <a
                href="https://github.com/bobby-99"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-mono-300 hover:text-accent transition-colors py-1"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/soumyaranjan-bobby/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-mono-300 hover:text-accent transition-colors py-1"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Step 6: Console Panel */}
          <div className="lg:col-span-6 w-full opacity-0 animate-[fadeUp_0.45s_ease-out_0.62s_forwards]">
            <ApiConsole />
          </div>
        </div>

        {/* Step 7: Static, Quiet Real Stack Strip */}
        <div className="mt-14 pt-8 border-t border-mono-800/70 opacity-0 animate-[fadeUp_0.4s_ease-out_0.75s_forwards]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-mono-300">
              <span className="text-accent uppercase tracking-wider text-[11px]">// stack:</span>
              <span className="text-mono-100 font-medium">Java 17</span>
              <span className="text-mono-500">·</span>
              <span className="text-mono-100 font-medium">Spring Boot 3</span>
              <span className="text-mono-500">·</span>
              <span className="text-mono-100 font-medium">Hibernate/JPA</span>
              <span className="text-mono-500">·</span>
              <span className="text-mono-100 font-medium">PostgreSQL</span>
              <span className="text-mono-500">·</span>
              <span className="text-mono-100 font-medium">REST</span>
              <span className="text-mono-500">·</span>
              <span className="text-mono-100 font-medium">SQL</span>
              <span className="text-mono-500">·</span>
              <span className="text-mono-100 font-medium">React</span>
            </div>

            <div className="flex items-center gap-4 text-mono-400 text-[11px]">
              <span>3 Projects Shipped</span>
              <span className="text-mono-600">|</span>
              <span>8.1 CGPA</span>
              <span className="text-mono-600">|</span>
              <span>2026 Grad</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

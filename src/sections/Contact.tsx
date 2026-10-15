import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Phone } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const email = 'soumyaranjan.bobby@gmail.com';
  const phone = '+91 6302753005';
  const cvUrl = 'https://drive.google.com/file/d/1ct11LkcfZNVKCYdC24xRfGa8VRi3jPxg/view?usp=sharing';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="contact" className="py-24 border-t border-mono-800/80 bg-[#0A0A0B] relative">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full">
        {/* 12-column pattern: left 4 = sticky label & heading, right 8 = content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column — 4 cols, sticky on desktop */}
          <div className="lg:col-span-4 lg:sticky lg:top-[120px] lg:self-start">
            <p className="font-mono text-accent text-xs tracking-widest uppercase mb-2 reveal-init">
              // 04 — contact
            </p>
            <div className="mask-wrapper">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.8rem] font-semibold text-mono-100 mask-inner leading-tight">
                Get In Touch
              </h2>
            </div>
            <p className="text-mono-400 text-xs sm:text-sm mt-3 font-mono reveal-init">
              Available for junior Java / Spring Boot backend roles.
            </p>
          </div>

          {/* Right Column — 8 cols */}
          <div className="lg:col-span-8 space-y-8">
            {/* Centerpiece: Large Mono Email + Copy beside it */}
            <div className="py-6 border-b border-mono-800/80 reveal-init">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <a
                  href={`mailto:${email}`}
                  className="font-mono text-xl sm:text-2xl md:text-3xl text-mono-100 hover:text-accent transition-colors break-all"
                >
                  {email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs bg-mono-900 border border-mono-700 text-mono-200 hover:border-accent hover:text-accent transition-all shrink-0 self-start sm:self-auto min-h-[38px] focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  aria-label={copied ? 'Copied' : 'Copy Address'}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-accent" />
                      <span className="text-accent font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-mono-400" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quiet text links below: phone (tel:) and Download CV (drop Google Drive) */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-6 mt-6 border-t border-mono-800/60 font-mono text-xs sm:text-sm text-mono-400">
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2 hover:text-accent transition-colors text-mono-300"
                >
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  <span>{phone}</span>
                </a>

                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-accent transition-colors text-mono-300"
                >
                  <span>Download CV</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Row — full width of the 1200px container */}
        <div className="mt-20 pt-8 border-t border-mono-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-mono-400 reveal-init">
          <p>© 2026 Soumyaranjan Dandapat · Backend Engineer</p>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/bobby-99"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-mono-300 hover:text-accent transition-colors py-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/soumyaranjan-bobby/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-mono-300 hover:text-accent transition-colors py-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

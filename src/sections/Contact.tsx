import { useRef } from 'react';
import MagneticButton from '../components/MagneticButton';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen flex flex-col justify-center py-20 md:py-32 px-6 bg-mono-950 relative">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <p className="font-mono text-mono-500 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Let's Work Together
          </h2>
          <p className="text-mono-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Currently available for freelance projects and full-time
            opportunities. Let's build something extraordinary.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center w-full sm:w-auto">
          <MagneticButton
            href="mailto:soumyaranjan.bobby@gmail.com"
            className="w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 bg-white text-black font-mono text-xs sm:text-sm tracking-widest uppercase hover:bg-mono-200 transition-colors rounded-full"
          >
            Send Email
          </MagneticButton>
          <MagneticButton
            href="tel:+916302753005"
            className="w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 border border-mono-700 font-mono text-xs sm:text-sm tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all rounded-full"
          >
            Give Me A Call
          </MagneticButton>
          <MagneticButton
            href="https://drive.google.com/file/d/11111111111111111111111111111111/view?usp=sharing"
            className="w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 border border-mono-700 font-mono text-xs sm:text-sm tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all rounded-full"
          >
            Download CV
          </MagneticButton>
        </div>

        <div className="pt-16 border-t border-mono-900 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-mono text-mono-600 text-sm">
              © 2026 Soumyaranjan D. All rights reserved.
            </p>
            <div className="flex gap-8 font-mono text-sm">
              <a
                href="https://github.com/bobby-99"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mono-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/soumyaranjan-bobby/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mono-400 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/ichotu69"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mono-400 hover:text-white transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

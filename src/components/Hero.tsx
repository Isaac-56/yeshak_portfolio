import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Download } from 'lucide-react';
import portrait from '../assets/1.png';

const floatingSkills = [
  'UI Design', 'UX Research', 'Prototyping', 'Figma',
  'HTML', 'CSS', 'JavaScript', 'Flutter',
  'Dart', 'Python', 'C++',
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-screen flex items-center pt-18 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 grid-bg-dense animate-grid-pulse" />

      {/* Geometric accents */}
      <div className="absolute top-1/4 right-[15%] w-px h-40 bg-gradient-to-b from-transparent via-accent/20 to-transparent hidden lg:block" />
      <div className="absolute bottom-1/3 left-[10%] w-24 h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent hidden lg:block" />

      {/* Scrolling skills ticker - positioned at top below nav */}
      <div className="absolute top-20 left-0 right-0 overflow-hidden pointer-events-none z-20">
        <div className="flex whitespace-nowrap animate-scroll">
          {/* First set of skills */}
          <div className="flex items-center gap-8 px-4">
            {floatingSkills.map((skill, i) => (
              <span
                key={`${skill}-1`}
                className="inline-block text-body-sm font-display font-500 text-secondary/80 border border-border/60 rounded-full px-4 py-1.5 bg-bg/80 backdrop-blur-sm"
              >
                {skill}
              </span>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex items-center gap-8 px-4">
            {floatingSkills.map((skill, i) => (
              <span
                key={`${skill}-2`}
                className="inline-block text-body-sm font-display font-500 text-secondary/80 border border-border/60 rounded-full px-4 py-1.5 bg-bg/80 backdrop-blur-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="section-padding relative z-10 w-full">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div
                className={`flex items-center gap-3 mb-6 transition-all duration-700 ease-out-expo ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-label font-display font-500 text-secondary uppercase tracking-wider">
                  Available for opportunities
                </span>
              </div>
              <h1
                className={`font-display font-700 text-display-xl md:text-display-lg text-primary text-balance transition-all duration-700 ease-out-expo delay-100 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                Designing products{' '}
                <span className="relative inline-block">
                  people enjoy
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 8C50 2 150 2 298 8"
                      stroke="#7C3AED"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                using.
              </h1>
            </div>

            <p
              className={`text-body-lg text-secondary max-w-xl transition-all duration-700 ease-out-expo delay-200 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              UI/UX Designer | Software Engineering Student
            </p>
            <p
              className={`text-body-md text-secondary max-w-lg leading-relaxed transition-all duration-700 ease-out-expo delay-300 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              I create intuitive digital experiences through user-centered design, research, and modern development practices. Currently pursuing a Software Engineering degree while designing digital products that balance usability, aesthetics, and business goals.
            </p>

            <div
              className={`flex flex-wrap gap-4 pt-2 transition-all duration-700 ease-out-expo delay-[400ms] ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-primary text-white text-body-sm font-medium rounded-lg hover:bg-accent transition-all duration-300"
              >
                View My Work
                <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </Link>
              <a
                href="#resume"
                className="inline-flex items-center gap-3 px-7 py-3.5 border border-border text-primary text-body-sm font-medium rounded-lg hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Download size={16} />
                Download Resume
              </a>
            </div>
          </div>

          {/* Right - Professional framed portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-12">
            <div
              className={`relative transition-all duration-700 ease-out-expo delay-300 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {/* Main framed container - 3 zone card: header bar / image area / footer bar */}
              <div className="w-72 md:w-80 lg:w-[22rem] relative rounded-2xl border border-border shadow-2xl overflow-hidden bg-white">
                {/* Header bar (kept empty/minimal - no plate/dimension text) */}
                <div className="h-7 border-b border-border/40" />

                {/* Image area with cream background */}
                <div className="relative bg-[#F7F1E1] aspect-[4/4.2]">
                  <img
                    src={portrait}
                    alt="Yeshak Tsegaye - UI/UX Designer & Software Engineer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Footer bar with name (left) and title (right) */}
                <div className="h-14 border-t border-border/40 flex items-center justify-between px-6">
                  <span className="font-display font-700 text-primary text-sm tracking-tight">
                    Yeshak Tsegaye
                  </span>
                  <span className="text-[11px] font-display font-400 text-secondary tracking-[0.05em]">
                    Designer / Engineer
                  </span>
                </div>
              </div>

              {/* Floating labels - smaller, refined pills, tucked closer to the card edge */}
              <div
                className="absolute top-6 -right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-md border border-border/70 animate-float-label"
                style={{ animationDelay: '0s' }}
              >
                <span className="w-1 h-1 rounded-full bg-accent" />
                <span className="text-[9px] font-display font-600 text-accent tracking-wide whitespace-nowrap">UX Research</span>
              </div>

              <div
                className="absolute top-1/3 -right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-md border border-border/70 animate-float-label"
                style={{ animationDelay: '0.8s' }}
              >
                <span className="w-1 h-1 rounded-full bg-accent-blue" />
                <span className="text-[9px] font-display font-600 text-accent-blue tracking-wide whitespace-nowrap">UI Design</span>
              </div>

              <div
                className="absolute bottom-24 -right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-md border border-border/70 animate-float-label"
                style={{ animationDelay: '1.6s' }}
              >
                <span className="w-1 h-1 rounded-full bg-primary" />
                <span className="text-[9px] font-display font-600 text-primary tracking-wide whitespace-nowrap">Figma</span>
              </div>

              <div
                className="absolute top-6 -left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-md border border-border/70 animate-float-label"
                style={{ animationDelay: '2s' }}
              >
                <span className="w-1 h-1 rounded-full bg-accent-blue" />
                <span className="text-[9px] font-display font-600 text-accent-blue tracking-wide whitespace-nowrap">CSS</span>
              </div>

              <div
                className="absolute top-1/3 -left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-md border border-border/70 animate-float-label"
                style={{ animationDelay: '0.4s' }}
              >
                <span className="w-1 h-1 rounded-full bg-primary" />
                <span className="text-[9px] font-display font-600 text-primary tracking-wide whitespace-nowrap">JavaScript</span>
              </div>

              <div
                className="absolute bottom-24 -left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-md border border-border/70 animate-float-label"
                style={{ animationDelay: '1.2s' }}
              >
                <span className="w-1 h-1 rounded-full bg-accent" />
                <span className="text-[9px] font-display font-600 text-accent tracking-wide whitespace-nowrap">Prototyping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - aesthetic design with bigger arrow */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-700 ease-out-expo delay-[800ms] ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-[11px] font-display font-medium text-secondary/50 tracking-[0.25em] uppercase">
          Scroll
        </span>
        <div
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          {/* Decorative line above arrow */}
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-secondary/20 to-secondary/40 group-hover:via-accent/40 group-hover:to-accent/60 transition-all duration-500" />
          {/* Bigger aesthetic arrow */}
          <ArrowDown
            size={28}
            className="text-secondary/40 -mt-0.5 animate-bounce-arrow group-hover:text-accent/70 transition-all duration-300 group-hover:scale-110"
            strokeWidth={1.5}
          />
        </div>
      </div>
    </section>
  );
}

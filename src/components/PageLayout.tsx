import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

interface PageLayoutProps {
  label: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function PageLayout({ label, title, subtitle, children }: PageLayoutProps) {
  const { pathname } = useLocation();
  const ref = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main className="pt-24 pb-30 min-h-screen relative">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="section-padding relative z-10">
        <div className="max-w-[1400px] mx-auto" ref={ref}>
          {/* Back link */}
          <Link
            to="/"
            className="reveal inline-flex items-center gap-2 text-body-sm font-medium text-secondary hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          {/* Page header */}
          <div className="reveal reveal-delay-1 mb-16">
            <span className="text-label font-display font-600 text-accent uppercase tracking-wider block mb-4">
              {label}
            </span>
            <h1 className="font-display font-700 text-display-lg text-primary text-balance mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-body-lg text-secondary max-w-2xl">{subtitle}</p>
            )}
          </div>

          {/* Page content */}
          {children}
        </div>
      </div>
    </main>
  );
}

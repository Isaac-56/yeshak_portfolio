import { ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 section-padding border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="font-display font-700 text-lg text-primary mb-1">
              Yeshak Tsegaye
            </div>
            <div className="text-body-sm text-secondary">
              UI/UX Designer
            </div>
            <div className="text-body-sm text-secondary mt-1">
              Designing products people enjoy using.
            </div>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-body-sm font-medium text-secondary hover:text-primary transition-colors group"
          >
            Back to top
            <div className="w-8 h-8 rounded-lg border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-border-light flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-body-sm text-secondary">
            &copy; {new Date().getFullYear()} Yeshak Tsegaye. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-label text-secondary/50 font-mono">Addis Ababa, Ethiopia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

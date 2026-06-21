import { useReveal } from '../hooks/useReveal';

const stats = [
  { value: '2+', label: 'Years Internship Experience' },
  { value: '5+', label: 'Major Projects' },
  { value: '10+', label: 'Technologies' },
  { value: '100%', label: 'User-Centered Design' },
];

export default function Statistics() {
  const ref = useReveal();

  return (
    <section ref={ref} className="py-24 section-padding border-t border-b border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`reveal reveal-delay-${i + 1} text-center md:text-left`}>
              <div className="font-display font-700 text-display-sm md:text-display-md text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-body-sm text-secondary font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

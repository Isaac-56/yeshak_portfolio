import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { ChevronDown, Users, Search, Pen, Rocket, BarChart3 } from 'lucide-react';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  bgLight: string;
  caseStudy: {
    problem: string;
    research: string;
    design: string;
    solution: string;
    outcome: string;
  };
}

const projects: Project[] = [
  {
    title: 'MindSpace',
    subtitle: 'UI/UX Design Project',
    description: 'Mental health and wellness platform focused on accessibility and user engagement.',
    color: 'text-accent',
    bgLight: 'bg-accent-light',
    caseStudy: {
      problem: 'Mental health resources are often stigmatized and difficult to access, especially for young adults who need discreet, approachable support.',
      research: 'Conducted user interviews with 30+ individuals, analyzed competitor platforms, and surveyed mental health professionals to understand barriers to access.',
      design: 'Created a calming visual language with warm colors, gentle micro-interactions, and a progressive disclosure approach to reduce cognitive load.',
      solution: 'Designed a platform with anonymous access, guided wellness journeys, mood tracking, and community support features with privacy-first architecture.',
      outcome: 'Usability testing showed 85% task completion rate, 40% reduction in onboarding time, and high user satisfaction scores for accessibility features.',
    },
  },
  {
    title: 'E-Commerce App',
    subtitle: 'End-to-End Shopping Experience',
    description: 'Intuitive product discovery and checkout flows for a modern shopping platform.',
    color: 'text-accent-blue',
    bgLight: 'bg-accent-blue-light',
    caseStudy: {
      problem: 'Users abandoned carts due to complex navigation, overwhelming choices, and a checkout process with too many friction points.',
      research: 'Analyzed heatmaps and session recordings, conducted card sorting exercises, and performed moderated usability tests with 25 participants.',
      design: 'Simplified the information architecture, introduced smart filtering, and created a streamlined 3-step checkout with persistent cart visibility.',
      solution: 'Redesigned the shopping flow with contextual search, personalized recommendations, one-tap checkout, and clear progress indicators throughout.',
      outcome: 'Cart abandonment decreased by 32%, checkout completion improved by 28%, and average session duration increased by 45 seconds.',
    },
  },
  {
    title: 'Flutter Reclaim App',
    subtitle: 'Mobile Application',
    description: 'Efficient user interactions and workflow management for mobile users.',
    color: 'text-primary',
    bgLight: 'bg-bg-alt',
    caseStudy: {
      problem: 'Existing workflow management tools were desktop-first and too complex for mobile use, creating friction for on-the-go task management.',
      research: 'Interviewed 20 mobile users, conducted competitive analysis of 8 mobile workflow apps, and ran diary studies tracking daily usage patterns.',
      design: 'Designed a gesture-driven interface with thumb-zone optimization, minimal text input requirements, and quick-action widgets for common tasks.',
      solution: 'Built a Flutter-based app with swipe actions, haptic feedback, offline-first architecture, and adaptive layouts for varied screen sizes.',
      outcome: 'User engagement increased by 60% compared to previous tools, with daily active usage averaging 4.2 sessions per day.',
    },
  },
  {
    title: 'E-Learning Platform',
    subtitle: 'Interactive Learning Environment',
    description: 'Designed to improve engagement and accessibility for online education.',
    color: 'text-accent',
    bgLight: 'bg-accent-light',
    caseStudy: {
      problem: 'Students struggled with low engagement, content overload, and lack of interactive elements in existing e-learning platforms.',
      research: 'Surveyed 100+ students and 15 educators, analyzed engagement metrics from existing platforms, and reviewed learning science research.',
      design: 'Applied gamification principles, chunked content into micro-lessons, and designed progress dashboards that motivate continued learning.',
      solution: 'Created an adaptive learning platform with personalized paths, interactive exercises, peer collaboration spaces, and achievement systems.',
      outcome: 'Course completion rates improved by 47%, daily active time increased by 35%, and student satisfaction scores rose significantly.',
    },
  },
  {
    title: 'Pregnancy Tracking App',
    subtitle: 'Health & Wellness',
    description: 'User-centered health tracking supporting mothers through every stage of pregnancy.',
    color: 'text-accent-blue',
    bgLight: 'bg-accent-blue-light',
    caseStudy: {
      problem: 'Existing pregnancy apps overwhelmed users with information and lacked personalization for different stages of pregnancy and individual health needs.',
      research: 'Conducted in-depth interviews with 35 expectant mothers, consulted with healthcare providers, and analyzed reviews of top pregnancy apps.',
      design: 'Created a week-by-week adaptive interface that evolves with the pregnancy, uses gentle illustrations, and provides stage-appropriate content.',
      solution: 'Designed a personalized tracking experience with milestone celebrations, appointment reminders, symptom logging, and community support matching.',
      outcome: 'App rating improved to 4.8/5, daily active retention reached 78%, and 92% of users reported feeling more informed and less anxious.',
    },
  },
];

const caseStudySteps = [
  { key: 'problem' as const, icon: Search, label: 'Problem' },
  { key: 'research' as const, icon: Users, label: 'Research' },
  { key: 'design' as const, icon: Pen, label: 'Design' },
  { key: 'solution' as const, icon: Rocket, label: 'Solution' },
  { key: 'outcome' as const, icon: BarChart3, label: 'Outcome' },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`reveal reveal-delay-${Math.min(index + 1, 5)} bg-white border border-border rounded-2xl overflow-hidden card-hover`}>
      <div className="p-8 md:p-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`inline-block w-2 h-2 rounded-full ${project.bgLight} ${project.color === 'text-accent' ? 'bg-accent' : project.color === 'text-accent-blue' ? 'bg-accent-blue' : 'bg-primary'}`} />
              <span className="text-label font-display font-600 text-secondary uppercase tracking-wider">
                {project.subtitle}
              </span>
            </div>
            <h3 className={`font-display font-700 text-display-sm ${project.color}`}>
              {project.title}
            </h3>
          </div>
          <span className="text-label font-mono text-secondary/40">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <p className="text-body-md text-secondary leading-relaxed mb-6">
          {project.description}
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-2 text-body-sm font-medium text-primary hover:text-accent transition-colors group"
        >
          {expanded ? 'Hide' : 'View'} Case Study
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Expandable case study */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-out-expo ${
          expanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-8 md:px-10 pb-8 md:pb-10 pt-2 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-6">
            {caseStudySteps.map(({ key, icon: Icon, label }) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon size={14} className={project.color} />
                  <span className="text-label font-display font-600 text-secondary uppercase tracking-wider">
                    {label}
                  </span>
                </div>
                <p className="text-body-sm text-secondary leading-relaxed">
                  {project.caseStudy[key]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useReveal();

  return (
    <section id="projects" ref={ref} className="py-30 section-padding relative">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="reveal mb-4">
          <span className="text-label font-display font-600 text-accent uppercase tracking-wider">
            Projects
          </span>
        </div>
        <h2 className="reveal reveal-delay-1 font-display font-700 text-display-md text-primary mb-6 text-balance">
          Selected work
        </h2>
        <p className="reveal reveal-delay-2 text-body-lg text-secondary mb-16 max-w-xl">
          Each project reflects a user-centered approach from research through delivery.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

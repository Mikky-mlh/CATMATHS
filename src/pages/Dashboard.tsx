import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, ArrowRight, TrendingUp, BookOpen, Clock } from 'lucide-react';
import { syllabus, getAllTopics } from '../data/syllabus';
import { useProgressStore } from '../store/useProgress';
import { cn } from '../lib/utils';

// Module accent color map
const moduleColors: Record<string, { bg: string; text: string; fill: string }> = {
  foundations: { bg: 'bg-mod-arithmetic/15', text: 'text-mod-arithmetic', fill: 'bg-mod-arithmetic' },
  'number-systems': { bg: 'bg-mod-numbers/15', text: 'text-mod-numbers', fill: 'bg-mod-numbers' },
  arithmetic: { bg: 'bg-mod-arithmetic/15', text: 'text-mod-arithmetic', fill: 'bg-mod-arithmetic' },
  algebra: { bg: 'bg-mod-algebra/15', text: 'text-mod-algebra', fill: 'bg-mod-algebra' },
  geometry: { bg: 'bg-mod-geometry/15', text: 'text-mod-geometry', fill: 'bg-mod-geometry' },
  'modern-math': { bg: 'bg-mod-modern/15', text: 'text-mod-modern', fill: 'bg-mod-modern' },
};

function getModuleColor(moduleId: string) {
  return moduleColors[moduleId] || moduleColors.foundations;
}

export function Dashboard() {
  const { completedTopics } = useProgressStore();
  const allTopics = getAllTopics();
  const completedCount = allTopics.filter(t => completedTopics[t.id]).length;
  const progressPercentage = Math.round((completedCount / allTopics.length) * 100) || 0;

  return (
    <div className="space-y-16 pb-12">
      {/* ===== HERO SECTION ===== */}
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
        {/* Left side — Editorial typographic statement (60%) */}
        <div className="flex-[3] space-y-6 pt-4">
          <div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-5xl text-ink tracking-[-0.03em] leading-[1.08] mb-4">
              Build your
              <br />
              <span className="text-primary">Quant muscle.</span>
            </h1>
            <p className="text-md text-ink-secondary leading-relaxed font-body" style={{ maxWidth: '52ch' }}>
              From zero to hero. A definitive compendium of mathematical aptitude
              for advanced management entrance — structured, tactical, and built for
              CAT aspirants who refuse to leave marks on the table.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-body font-medium text-ink-muted">
            <span>{allTopics.length}+ topics</span>
            <span className="text-line">·</span>
            <span>200+ problems</span>
            <span className="text-line">·</span>
            <span>Zero prerequisites</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to={`/topic/${allTopics[0].id}`}
              className="btn btn-primary text-sm"
            >
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/custom-test"
              className="btn btn-secondary text-sm"
            >
              Practice Test
            </Link>
            <Link
              to="/cheat-sheet"
              className="btn btn-ghost text-sm"
            >
              Formula Sheet
            </Link>
          </div>
        </div>

        {/* Right side — Chalkboard element (40%) */}
        <div className="flex-[2] hidden md:block">
          <div className="chalkboard h-full min-h-[16rem] rounded-xl p-8 flex flex-col justify-end relative">
            <div className="chalkboard-watermark">
              x² + 2x + 1<br />
              = (x + 1)²
            </div>
            {/* Progress info on chalkboard */}
            <div className="relative z-10">
              <p className="text-sm font-body font-medium text-white/50 uppercase tracking-[0.1em] mb-1">
                Your progress
              </p>
              <p className="text-4xl font-display text-white/90 mb-3">
                {progressPercentage}%
              </p>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full transition-all duration-700"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-white/40 mt-2 font-body">
                {completedCount} of {allTopics.length} topics completed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STAT STRIP (mobile progress) ===== */}
      <section className="md:hidden">
        <div className="stat-strip">
          <div className="stat-item">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center text-success">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-ink-muted uppercase tracking-[0.08em] font-body">
                Progress
              </p>
              <p className="text-2xl font-display text-ink tabular-nums">
                {progressPercentage}%
              </p>
            </div>
          </div>
          <div className="stat-item">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-ink-muted uppercase tracking-[0.08em] font-body">
                Completed
              </p>
              <p className="text-2xl font-display text-ink tabular-nums">
                {completedCount}/{allTopics.length}
              </p>
            </div>
          </div>
          <div className="stat-item">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-ink-muted uppercase tracking-[0.08em] font-body">
                Exam
              </p>
              <p className="text-lg font-display text-ink leading-tight">
                22 Qs
                <span className="text-xs font-body font-normal text-ink-muted block">in 40 min</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STUDY ROADMAP ===== */}
      <section>
        <h2 className="font-display text-2xl text-ink mb-8 tracking-[-0.02em]">
          Study Roadmap
        </h2>

        <div className="space-y-6">
          {syllabus.map((module, idx) => {
            const moduleTopics = module.topics;
            const completedInModule = moduleTopics.filter(t => completedTopics[t.id]).length;
            const isModuleComplete = completedInModule === moduleTopics.length;
            const colors = getModuleColor(module.id);

            return (
              <RevealOnScroll key={module.id} delay={idx * 80}>
                <div className="card overflow-hidden">
                  {/* Module Header */}
                  <div className="module-header">
                    <div className="flex items-center gap-3">
                      <span className={cn('module-number', colors.fill)}>
                        {idx + 1}
                      </span>
                      <h3 className="text-lg font-display text-ink">
                        {module.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="module-progress-bar">
                        <div
                          className={cn(
                            'module-progress-fill',
                            isModuleComplete ? 'bg-success' : colors.fill
                          )}
                          style={{
                            width: `${(completedInModule / moduleTopics.length) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-body font-medium text-ink-muted tabular-nums min-w-[3rem] text-right">
                        {completedInModule}/{moduleTopics.length}
                      </span>
                    </div>
                  </div>

                  {/* Topic List */}
                  <div>
                    {moduleTopics.map((topic) => {
                      const isCompleted = completedTopics[topic.id];
                      return (
                        <Link
                          key={topic.id}
                          to={`/topic/${topic.id}`}
                          className="topic-row group"
                        >
                          <div className="flex items-center gap-3">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-line shrink-0 group-hover:text-primary transition-colors" />
                            )}
                            <span className={cn(
                              'font-body text-sm font-medium',
                              isCompleted ? 'text-ink line-through opacity-60' : 'text-ink-secondary'
                            )}>
                              {topic.title}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-line group-hover:text-primary transition-all group-hover:translate-x-1" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* --- Scroll-triggered reveal wrapper --- */
function RevealOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number; key?: React.Key }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

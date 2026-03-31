import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ChevronRight, Home, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { getTopicById, getAllTopics } from '../data/syllabus';
import { QuizEngine } from '../components/QuizEngine';
import { useProgressStore } from '../store/useProgress';
import { cn } from '../lib/utils';

export function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const { completedTopics, markComplete } = useProgressStore();

  const allTopics = getAllTopics();
  const topicIndex = allTopics.findIndex(t => t.id === topicId);
  const topic = allTopics[topicIndex];

  const prevTopic = topicIndex > 0 ? allTopics[topicIndex - 1] : null;
  const nextTopic = topicIndex < allTopics.length - 1 ? allTopics[topicIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topicId]);

  if (!topic) {
    return <Navigate to="/" replace />;
  }

  const isCompleted = completedTopics[topic.id];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in">
      {/* --- Breadcrumbs --- */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/" className="flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-line" />
        <span>{topic.moduleTitle}</span>
        <ChevronRight className="w-3.5 h-3.5 text-line" />
        <span className="current truncate max-w-[200px] md:max-w-none">
          {topic.title}
        </span>
      </nav>

      {/* --- Header --- */}
      <header className="border-b border-line pb-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <p className="text-xs font-body font-semibold text-ink-muted uppercase tracking-[0.1em] mb-2">
              {topic.moduleTitle}
            </p>
            <h1 className="font-display text-3xl md:text-4xl text-ink tracking-[-0.03em] leading-[1.1]">
              {topic.title}
            </h1>
          </div>
          <button
            onClick={() => markComplete(topic.id)}
            className={cn(
              'btn btn-stamp flex items-center gap-2 text-sm shrink-0',
              isCompleted
                ? 'completed'
                : 'bg-surface border border-line hover:border-primary text-ink'
            )}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isCompleted ? 'Completed' : 'Mark Complete'}
          </button>
        </div>
      </header>

      {/* --- Lesson Content --- */}
      <article className="lesson-content">
        {topic.content}
      </article>

      {/* --- Practice Questions --- */}
      <section className="pt-12 border-t border-line">
        <h2 className="font-display text-2xl text-ink mb-6">
          Practice Questions
        </h2>
        <QuizEngine
          questions={topic.quiz}
          onComplete={(score, total) => {
            if (score / total >= 0.5) {
              markComplete(topic.id);
            }
          }}
        />
      </section>

      {/* --- Prev / Next Navigation --- */}
      <nav className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-line">
        {prevTopic ? (
          <Link
            to={`/topic/${prevTopic.id}`}
            className="flex items-center gap-3 px-5 py-4 card hover:bg-surface-alt transition-colors group flex-1 sm:flex-none"
          >
            <ArrowLeft className="w-4 h-4 text-ink-muted group-hover:text-primary transition-colors" />
            <div className="text-left">
              <div className="text-xs text-ink-muted uppercase tracking-[0.08em] font-body font-semibold">
                Previous
              </div>
              <div className="text-sm font-body font-medium text-ink truncate max-w-[180px]">
                {prevTopic.title}
              </div>
            </div>
          </Link>
        ) : <div />}

        {nextTopic && (
          <Link
            to={`/topic/${nextTopic.id}`}
            className="flex items-center justify-end gap-3 px-5 py-4 card hover:bg-surface-alt border-secondary/30 transition-colors group flex-1 sm:flex-none"
          >
            <div className="text-right">
              <div className="text-xs text-secondary uppercase tracking-[0.08em] font-body font-semibold">
                Next Topic
              </div>
              <div className="text-sm font-body font-medium text-ink truncate max-w-[180px]">
                {nextTopic.title}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-secondary group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </nav>
    </div>
  );
}

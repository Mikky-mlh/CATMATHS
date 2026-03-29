import React, { useEffect } from 'react';
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
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900 dark:text-gray-200">{topic.moduleTitle}</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-blue-600 dark:text-blue-400 truncate max-w-[200px] md:max-w-none">
          {topic.title}
        </span>
      </nav>

      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {topic.title}
          </h1>
          <button
            onClick={() => markComplete(topic.id)}
            className={cn(
              "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm",
              isCompleted 
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            )}
          >
            <CheckCircle2 className="w-5 h-5" />
            {isCompleted ? 'Completed' : 'Mark as Complete'}
          </button>
        </div>
      </header>

      {/* Content */}
      <article className="prose prose-blue dark:prose-invert max-w-none">
        {topic.content}
      </article>

      {/* Practice Section */}
      <section className="pt-12 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <span className="text-3xl">✏️</span> Practice Questions
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

      {/* Navigation Footer */}
      <nav className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 dark:border-gray-700">
        {prevTopic ? (
          <Link
            to={`/topic/${prevTopic.id}`}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl font-medium transition-colors text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs text-gray-400 uppercase tracking-wider">Previous</div>
              <div className="truncate max-w-[150px]">{prevTopic.title}</div>
            </div>
          </Link>
        ) : <div />}

        {nextTopic && (
          <Link
            to={`/topic/${nextTopic.id}`}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 rounded-xl font-medium transition-colors text-blue-700 dark:text-blue-300"
          >
            <div className="text-right">
              <div className="text-xs text-blue-400 uppercase tracking-wider">Next Topic</div>
              <div className="truncate max-w-[150px]">{nextTopic.title}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Link>
        )}
      </nav>
    </div>
  );
}

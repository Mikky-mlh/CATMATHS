import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, Circle, ArrowRight, TrendingUp, Target, Clock, BrainCircuit } from 'lucide-react';
import { syllabus, getAllTopics } from '../data/syllabus';
import { useProgressStore } from '../store/useProgress';
import { cn } from '../lib/utils';

export function Dashboard() {
  const { completedTopics } = useProgressStore();
  const allTopics = getAllTopics();
  const completedCount = allTopics.filter(t => completedTopics[t.id]).length;
  const progressPercentage = Math.round((completedCount / allTopics.length) * 100) || 0;

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 text-white/10">
          <Target className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Master CATMATHS
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
            From zero to hero. A definitive compendium of mathematical aptitude for advanced management entrance.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to={`/topic/${allTopics[0].id}`}
              className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-sm flex items-center gap-2"
            >
              Start Learning <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/custom-test"
              className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2"
            >
              <BrainCircuit className="w-5 h-5" />
              AI Custom Test
            </Link>
            <Link 
              to="/cheat-sheet"
              className="px-6 py-3 bg-blue-500/30 hover:bg-blue-500/50 text-white font-bold rounded-xl backdrop-blur-sm transition-colors flex items-center gap-2"
            >
              Formula Cheat Sheet
            </Link>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Overall Progress</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{progressPercentage}%</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Topics Completed</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{completedCount} / {allTopics.length}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="p-4 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Exam Format</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white leading-tight">22 Qs <br/><span className="text-sm font-normal text-gray-500">in 40 mins</span></p>
          </div>
        </div>
      </section>

      {/* Study Roadmap */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-500" />
          Study Roadmap
        </h2>
        <div className="space-y-6">
          {syllabus.map((module, idx) => {
            const moduleTopics = module.topics;
            const completedInModule = moduleTopics.filter(t => completedTopics[t.id]).length;
            const isModuleComplete = completedInModule === moduleTopics.length;

            return (
              <div key={module.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm">
                        {idx + 1}
                      </span>
                      {module.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full transition-all duration-500", isModuleComplete ? "bg-emerald-500" : "bg-blue-500")}
                        style={{ width: `${(completedInModule / moduleTopics.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 min-w-[3rem] text-right">
                      {completedInModule}/{moduleTopics.length}
                    </span>
                  </div>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {moduleTopics.map((topic) => {
                    const isCompleted = completedTopics[topic.id];
                    return (
                      <Link 
                        key={topic.id} 
                        to={`/topic/${topic.id}`}
                        className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-blue-400 transition-colors" />
                          )}
                          <span className={cn("font-medium", isCompleted ? "text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-300")}>
                            {topic.title}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors group-hover:translate-x-1" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

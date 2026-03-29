import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, CheckCircle2, Circle, Moon, Sun, BookOpen, LayoutDashboard, FileText, BrainCircuit } from 'lucide-react';
import { useProgressStore } from '../store/useProgress';
import { syllabus } from '../data/syllabus';
import { cn } from '../lib/utils';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { completedTopics, isDarkMode, toggleDarkMode } = useProgressStore();
  const location = useLocation();

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-yellow-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 flex">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-400">
          <BookOpen className="w-6 h-6" />
          <span>CAT Math Prep</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:sticky top-0 left-0 h-screen w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col z-50 transition-transform duration-300 ease-in-out overflow-y-auto",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 hidden md:flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
            <BookOpen className="w-6 h-6" />
            <span>CAT Math Prep</span>
          </Link>
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-6 mt-16 md:mt-0">
          <div className="space-y-1">
            <Link 
              to="/" 
              onClick={closeSidebar}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
                location.pathname === '/' 
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            <Link 
              to="/custom-test" 
              onClick={closeSidebar}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
                location.pathname === '/custom-test' 
                  ? "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <BrainCircuit className="w-5 h-5" />
              AI Custom Test
            </Link>
            <Link 
              to="/cheat-sheet" 
              onClick={closeSidebar}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
                location.pathname === '/cheat-sheet' 
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <FileText className="w-5 h-5" />
              Formula Cheat Sheet
            </Link>
          </div>

          {syllabus.map((module) => (
            <div key={module.id} className="space-y-2">
              <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {module.title}
              </h3>
              <div className="space-y-1">
                {module.topics.map((topic) => {
                  const isCompleted = completedTopics[topic.id];
                  const isActive = location.pathname === `/topic/${topic.id}`;
                  
                  return (
                    <Link
                      key={topic.id}
                      to={`/topic/${topic.id}`}
                      onClick={closeSidebar}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                        isActive 
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium" 
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0" />
                      )}
                      <span className="truncate">{topic.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 mt-16 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
}

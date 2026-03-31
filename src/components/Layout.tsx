import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { CheckCircle2, Circle, Sun, Moon, LayoutDashboard, FileText, BrainCircuit } from 'lucide-react';
import { useProgressStore } from '../store/useProgress';
import { syllabus } from '../data/syllabus';
import { cn } from '../lib/utils';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { completedTopics, isDarkMode, toggleDarkMode } = useProgressStore();
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  const closeSidebar = () => setIsSidebarOpen(false);

  // Scroll detection for nav ribbon
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isSidebarOpen]);

  const isTopicPage = location.pathname.startsWith('/topic/');

  return (
    <div className="min-h-[100dvh] bg-canvas text-ink font-body noise-overlay">
      {/* --- Reading Progress Bar (only on topic pages) --- */}
      {isTopicPage && <ReadingProgressBar />}

      {/* --- Top Navigation Ribbon --- */}
      <nav
        ref={navRef}
        className={cn('nav-ribbon', isScrolled && 'scrolled')}
      >
        {/* Brand Mark */}
        <Link to="/" className="brand-mark logo-reveal">
          <span className="brand-mark-cat">CAT</span>
          <span className="brand-mark-maths">MATHS</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={cn('nav-link', location.pathname === '/' && 'active')}
          >
            <span className="flex items-center gap-1.5">
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </span>
          </Link>
          <Link
            to="/custom-test"
            className={cn('nav-link', location.pathname === '/custom-test' && 'active')}
          >
            <span className="flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5" />
              Practice Test
            </span>
          </Link>
          <Link
            to="/cheat-sheet"
            className={cn('nav-link', location.pathname === '/cheat-sheet' && 'active')}
          >
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Formulas
            </span>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="btn-ghost rounded-lg p-2.5"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun className="w-[1.125rem] h-[1.125rem]" />
            ) : (
              <Moon className="w-[1.125rem] h-[1.125rem]" />
            )}
          </button>

          {/* Mobile menu toggle (hamburger → minus) */}
          <button
            className={cn('menu-toggle md:hidden', isSidebarOpen && 'open')}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isSidebarOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* --- Mobile overlay --- */}
      <div
        className={cn('sidebar-overlay lg:hidden', isSidebarOpen && 'visible')}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* --- Main Layout --- */}
      <div className="flex">
        {/* --- Sidebar Panel --- */}
        <aside className={cn('sidebar-panel', isSidebarOpen && 'open')}>
          {/* Mobile nav links */}
          <div className="p-4 space-y-1 lg:hidden border-b border-line-light">
            <Link
              to="/"
              onClick={closeSidebar}
              className={cn(
                'topic-link font-semibold',
                location.pathname === '/' && 'active'
              )}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              to="/custom-test"
              onClick={closeSidebar}
              className={cn(
                'topic-link font-semibold',
                location.pathname === '/custom-test' && 'active'
              )}
            >
              <BrainCircuit className="w-4 h-4" />
              Practice Test
            </Link>
            <Link
              to="/cheat-sheet"
              onClick={closeSidebar}
              className={cn(
                'topic-link font-semibold',
                location.pathname === '/cheat-sheet' && 'active'
              )}
            >
              <FileText className="w-4 h-4" />
              Formulas
            </Link>
          </div>

          {/* Topic tree */}
          <nav className="p-4 space-y-6" aria-label="Study topics">
            {syllabus.map((module) => (
              <div key={module.id} className="space-y-1">
                <h3 className="px-3 text-xs font-semibold text-ink-muted uppercase tracking-[0.1em] font-body">
                  {module.title}
                </h3>
                <div className="space-y-0.5">
                  {module.topics.map((topic) => {
                    const isCompleted = completedTopics[topic.id];
                    const isActive = location.pathname === `/topic/${topic.id}`;
                    return (
                      <Link
                        key={topic.id}
                        to={`/topic/${topic.id}`}
                        onClick={closeSidebar}
                        className={cn('topic-link', isActive && 'active')}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-line shrink-0" />
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

        {/* --- Main Content --- */}
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-8 py-8">
          <Outlet />
        </main>
      </div>

      {/* --- Footer --- */}
      <footer className="footer">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
            <div>
              <div className="brand-mark mb-2" style={{ color: '#E8E2D8' }}>
                <span className="brand-mark-cat">CAT</span>
                <span className="brand-mark-maths">MATHS</span>
              </div>
              <p className="text-sm opacity-70 font-body" style={{ maxWidth: '40ch' }}>
                Mathematics, demystified.
              </p>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-body font-medium">
              <Link to="/">Dashboard</Link>
              <Link to="/cheat-sheet">Formulas</Link>
              <Link to="/custom-test">Practice Test</Link>
            </nav>
          </div>
          <div className="border-t border-white/10 pt-4 text-xs opacity-50 font-body">
            Built for CAT aspirants starting from scratch.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* --- Reading Progress Bar Component --- */
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(100, (scrollTop / docHeight) * 100));
      }
      rafId = requestAnimationFrame(updateProgress);
    };
    rafId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      className="reading-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  );
}

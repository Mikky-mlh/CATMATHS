import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, RefreshCw } from 'lucide-react';
import { QuizQuestion } from '../data/syllabus';
import { MathText } from './MathText';
import { cn } from '../lib/utils';

interface QuizEngineProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function QuizEngine({ questions, onComplete }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [titaAnswer, setTitaAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="p-8 bg-surface-alt rounded-xl text-center">
        <p className="text-ink-muted font-body italic font-display text-lg">
          No practice questions available for this topic yet.
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isCorrect = currentQuestion.type === 'mcq'
    ? selectedOption === currentQuestion.correct
    : titaAnswer.trim() === String(currentQuestion.correct).trim();

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitted) return;

    if (currentQuestion.type === 'mcq' && selectedOption === null) return;
    if (currentQuestion.type === 'tita' && !titaAnswer.trim()) return;

    setIsSubmitted(true);
    if (isCorrect) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setTitaAnswer('');
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
      onComplete?.(score + (isCorrect ? 1 : 0), questions.length);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setTitaAnswer('');
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  // --- Completion Screen ---
  if (isFinished) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);
    const isPassing = percentage >= 50;

    return (
      <div className="card p-8 text-center space-y-6">
        <h3 className="font-display text-2xl text-ink">Quiz Complete</h3>
        <div className={cn(
          'text-6xl font-display tabular-nums',
          isPassing ? 'text-success' : 'text-error'
        )}>
          {percentage}%
        </div>
        <p className="text-ink-secondary font-body">
          You scored <span className="font-semibold text-ink">{finalScore}</span> out of{' '}
          <span className="font-semibold text-ink">{questions.length}</span> correct.
        </p>
        <button
          onClick={handleRestart}
          className="btn btn-secondary"
        >
          <RefreshCw className="w-4 h-4" />
          Retake Quiz
        </button>
      </div>
    );
  }

  // --- Quiz Progress Dots ---
  const renderDots = () => {
    // For 10 or fewer questions, show all dots
    if (questions.length <= 10) {
      return questions.map((_, i) => (
        <span
          key={i}
          className={cn(
            'quiz-dot',
            i === currentIndex && 'current',
            i < currentIndex && 'done'
          )}
        />
      ));
    }

    // For 11+ questions, show current ± 2 with ellipsis
    const dots: React.ReactNode[] = [];
    const start = Math.max(0, currentIndex - 2);
    const end = Math.min(questions.length - 1, currentIndex + 2);

    if (start > 0) {
      dots.push(<span key="start-ellipsis" className="text-xs text-ink-muted font-mono">...</span>);
    }

    for (let i = start; i <= end; i++) {
      dots.push(
        <span
          key={i}
          className={cn(
            'quiz-dot',
            i === currentIndex && 'current',
            i < currentIndex && 'done'
          )}
        />
      );
    }

    if (end < questions.length - 1) {
      dots.push(<span key="end-ellipsis" className="text-xs text-ink-muted font-mono">...</span>);
    }

    return dots;
  };

  return (
    <div className="card overflow-hidden">
      {/* --- Header Bar --- */}
      <div className="p-4 bg-surface-alt border-b border-line-light flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-body font-semibold text-ink-secondary text-sm">
            Question {currentIndex + 1}
            <span className="text-ink-muted font-normal"> of {questions.length}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress dots (hide on very small screens for 11+ questions) */}
          <div className="quiz-dots hidden sm:flex">
            {renderDots()}
          </div>
          {/* Mobile: text fallback */}
          <span className="sm:hidden text-xs font-mono text-ink-muted tabular-nums">
            {currentIndex + 1}/{questions.length}
          </span>

          <span className="text-xs px-2.5 py-1 bg-surface border border-line rounded-md font-body font-medium text-ink-muted uppercase tracking-[0.06em]">
            {currentQuestion.type === 'mcq' ? 'MCQ' : 'TITA'}
          </span>
        </div>
      </div>

      {/* --- Question Body --- */}
      <div className="p-6 md:p-8">
        <h4 className="text-lg font-body font-medium text-ink mb-6 leading-relaxed" style={{ maxWidth: '65ch' }}>
          <MathText text={currentQuestion.question} />
        </h4>

        {/* MCQ Options */}
        {currentQuestion.type === 'mcq' ? (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = currentQuestion.correct === idx;

              let optionState = '';
              if (isSubmitted) {
                if (isCorrectOption) {
                  optionState = 'correct';
                } else if (isSelected && !isCorrectOption) {
                  optionState = 'incorrect';
                } else {
                  optionState = 'faded';
                }
              } else if (isSelected) {
                optionState = 'selected';
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => setSelectedOption(idx)}
                  className={cn('quiz-option', optionState)}
                >
                  <span className="quiz-letter">
                    {isSubmitted && isCorrectOption ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : isSubmitted && isSelected && !isCorrectOption ? (
                      <XCircle className="w-4 h-4 text-white" />
                    ) : (
                      OPTION_LETTERS[idx]
                    )}
                  </span>
                  <span className="flex-1">
                    <MathText text={option} />
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          /* TITA Input */
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={titaAnswer}
              onChange={(e) => setTitaAnswer(e.target.value)}
              disabled={isSubmitted}
              placeholder="Type your answer here..."
              className={cn(
                'w-full p-4 text-lg rounded-xl border-2 bg-transparent font-mono transition-colors focus:outline-none',
                !isSubmitted
                  ? 'border-line focus:border-primary'
                  : isCorrect
                    ? 'border-success text-success'
                    : 'border-error text-error'
              )}
            />
            {isSubmitted && (
              <div className="flex items-center gap-2 font-body font-medium">
                {isCorrect ? (
                  <span className="text-success flex items-center gap-1">
                    <CheckCircle2 className="w-5 h-5" /> Correct!
                  </span>
                ) : (
                  <span className="text-error flex items-center gap-1">
                    <XCircle className="w-5 h-5" /> Incorrect. The correct answer is{' '}
                    <span className="font-mono font-semibold">{currentQuestion.correct}</span>
                  </span>
                )}
              </div>
            )}
          </form>
        )}

        {/* --- Action Area --- */}
        <div className="mt-8">
          {!isSubmitted ? (
            <button
              onClick={() => handleSubmit()}
              disabled={
                currentQuestion.type === 'mcq'
                  ? selectedOption === null
                  : !titaAnswer.trim()
              }
              className="btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              Check Answer
            </button>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              {/* Solution callout */}
              <div className="callout callout-info">
                <h4>Solution</h4>
                <div className="leading-relaxed font-body">
                  <MathText text={currentQuestion.solution} />
                </div>
              </div>

              <button
                onClick={handleNext}
                className="btn bg-ink text-surface hover:opacity-90"
              >
                {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

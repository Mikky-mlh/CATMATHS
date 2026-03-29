import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, RefreshCw } from 'lucide-react';
import { QuizQuestion } from '../data/syllabus';
import { MathText } from './MathText';
import { cn } from '../lib/utils';

interface QuizEngineProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

export function QuizEngine({ questions, onComplete }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [titaAnswer, setTitaAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center text-gray-500">
        No practice questions available for this topic yet.
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

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
        <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
        <div className="text-6xl font-black text-blue-600 dark:text-blue-400 my-6">
          {percentage}%
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          You scored {score} out of {questions.length} correct.
        </p>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <span className="font-semibold text-gray-600 dark:text-gray-300">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-full font-medium">
          {currentQuestion.type === 'mcq' ? 'Multiple Choice' : 'Type in the Answer'}
        </span>
      </div>

      <div className="p-6 md:p-8">
        <h4 className="text-lg md:text-xl font-medium mb-6 leading-relaxed">
          <MathText text={currentQuestion.question} />
        </h4>

        {currentQuestion.type === 'mcq' ? (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = currentQuestion.correct === idx;
              
              let optionClasses = "w-full text-left p-4 rounded-xl border-2 transition-all ";
              
              if (!isSubmitted) {
                optionClasses += isSelected 
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" 
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700";
              } else {
                if (isCorrectOption) {
                  optionClasses += "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300";
                } else if (isSelected && !isCorrectOption) {
                  optionClasses += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
                } else {
                  optionClasses += "border-gray-200 dark:border-gray-700 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => setSelectedOption(idx)}
                  className={optionClasses}
                >
                  <div className="flex items-center justify-between">
                    <span><MathText text={option} /></span>
                    {isSubmitted && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    {isSubmitted && isSelected && !isCorrectOption && <XCircle className="w-5 h-5 text-red-500" />}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={titaAnswer}
              onChange={(e) => setTitaAnswer(e.target.value)}
              disabled={isSubmitted}
              placeholder="Type your answer here..."
              className={cn(
                "w-full p-4 text-lg rounded-xl border-2 bg-transparent transition-colors focus:outline-none",
                !isSubmitted 
                  ? "border-gray-300 dark:border-gray-600 focus:border-blue-500" 
                  : isCorrect 
                    ? "border-emerald-500 text-emerald-700 dark:text-emerald-400" 
                    : "border-red-500 text-red-700 dark:text-red-400"
              )}
            />
            {isSubmitted && (
              <div className="flex items-center gap-2 font-medium">
                {isCorrect ? (
                  <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-5 h-5"/> Correct!</span>
                ) : (
                  <span className="text-red-600 flex items-center gap-1"><XCircle className="w-5 h-5"/> Incorrect. The correct answer is {currentQuestion.correct}</span>
                )}
              </div>
            )}
          </form>
        )}

        {/* Actions & Solution */}
        <div className="mt-8">
          {!isSubmitted ? (
            <button
              onClick={() => handleSubmit()}
              disabled={currentQuestion.type === 'mcq' ? selectedOption === null : !titaAnswer.trim()}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              Check Answer
            </button>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <h5 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Solution:</h5>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <MathText text={currentQuestion.solution} />
                </div>
              </div>
              <button
                onClick={handleNext}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

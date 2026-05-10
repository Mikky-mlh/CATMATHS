import { useState } from 'react';
import { BrainCircuit, Loader2, AlertCircle } from 'lucide-react';
import { getAllTopics, QuizQuestion } from '../data/syllabus';
import { QuizEngine } from '../components/QuizEngine';
import { cn } from '../lib/utils';

function parseAIResponse(content: string): QuizQuestion[] {
  // Remove markdown code fences
  let cleaned = content.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '');

  // Extract JSON object or array
  const firstBrace = cleaned.indexOf('{');
  const firstBracket = cleaned.indexOf('[');
  const lastBrace = cleaned.lastIndexOf('}');
  const lastBracket = cleaned.lastIndexOf(']');

  let jsonStr = '';
  if (firstBrace !== -1 && lastBrace !== -1 && firstBrace < lastBrace) {
    jsonStr = cleaned.substring(firstBrace, lastBrace + 1);
  } else if (firstBracket !== -1 && lastBracket !== -1 && firstBracket < lastBracket) {
    jsonStr = cleaned.substring(firstBracket, lastBracket + 1);
  } else {
    throw new Error('AI response does not contain valid JSON.');
  }

  // Clean HTML entities and fix unquoted keys
  jsonStr = jsonStr.trim()
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/,\s*([}\]])/g, '$1')
    .replace(/([{,])\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');

  const parsed = JSON.parse(jsonStr);
  const questionsArray = Array.isArray(parsed) ? parsed : parsed.questions || [];

  if (!Array.isArray(questionsArray) || questionsArray.length === 0) {
    throw new Error('No questions found in AI response.');
  }

  return questionsArray.map((item: any) => {
    let correct: number | string = item.correctAnswer;
    if (item.type === 'mcq') {
      const index = item.options?.findIndex((opt: string) => opt === item.correctAnswer) ?? -1;
      correct = index !== -1 ? index : 0;
    }
    return {
      id: item.id,
      type: item.type,
      question: item.question,
      options: item.options,
      correct,
      solution: item.solution,
    };
  });
}

export function CustomTest() {
  const allTopics = getAllTopics();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState<QuizQuestion[]>([]);

  const toggleTopic = (id: string) => {
    setSelectedTopics(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    if (selectedTopics.length === 0) {
      setError('Please select at least one topic.');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedQuestions([]);

    // Simulate processing delay for UX
    await new Promise(resolve => setTimeout(resolve, 800));

    let apiRetryCount = 0;
    const maxApiRetries = 2;

    while (apiRetryCount <= maxApiRetries) {
      try {
        const topicNames = selectedTopics
          .map(id => allTopics.find(t => t.id === id)?.title)
          .filter(Boolean)
          .join(', ');

        const response = await fetch('/api/generate-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topicNames, numQuestions })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));

          if (response.status === 429 && apiRetryCount < maxApiRetries) {
            apiRetryCount++;
            setError('Professor is busy. Retrying in a moment...');
            await new Promise(resolve => setTimeout(resolve, 2000));
            continue;
          }

          throw new Error(errorData.error || `API Error: ${response.status}`);
        }

        const apiResult = await response.json();
        const questions = parseAIResponse(apiResult.content);
        setGeneratedQuestions(questions);
        return;
      } catch (err: any) {
        apiRetryCount++;

        const message = err.message || 'Failed to generate questions. Please try again.';
        let userMessage = message;

        if (message.includes('rate limit') || message.includes('429')) {
          userMessage = 'Too many students asking questions! Please wait 30 seconds and try again.';
        } else if (message.includes('timeout') || message.includes('network')) {
          userMessage = 'Connection issue. Check your internet and try again.';
        } else if (message.includes('JSON') || message.includes('parse') || message.includes('Invalid')) {
          userMessage = 'Professor got confused. Try selecting fewer topics or questions.';
        }

        if (apiRetryCount > maxApiRetries || !(message.includes('429') || message.includes('JSON'))) {
          setError(userMessage);
          break;
        }

        setError(userMessage);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 space-y-8 animate-in fade-in">
      {/* --- Header --- */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-ink tracking-[-0.03em]">
            Practice Test
          </h1>
        </div>
        <p className="text-ink-secondary font-body text-md" style={{ maxWidth: '52ch' }}>
          Select your topics and let AI generate a personalized CAT-level practice test.
        </p>
      </div>

      {/* --- Configuration Panel --- */}
      {generatedQuestions.length === 0 && (
        <div className="card p-6 md:p-8 space-y-8">
          {/* Topic Selection */}
          <div>
            <h2 className="font-display text-xl text-ink mb-4">
              1. Select Topics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {allTopics.map(topic => (
                <label
                  key={topic.id}
                  className={cn(
                    'flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-all font-body text-sm',
                    selectedTopics.includes(topic.id)
                      ? 'border-secondary bg-tip-bg text-ink font-medium'
                      : 'border-line-light hover:border-secondary/50 text-ink-secondary'
                  )}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedTopics.includes(topic.id)}
                    onChange={() => toggleTopic(topic.id)}
                  />
                  {/* Custom checkbox indicator */}
                  <span className={cn(
                    'w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all',
                    selectedTopics.includes(topic.id)
                      ? 'bg-secondary border-secondary'
                      : 'border-line'
                  )}>
                    {selectedTopics.includes(topic.id) && (
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="truncate">{topic.title}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div>
            <h2 className="font-display text-xl text-ink mb-4">
              2. Number of Questions
            </h2>
            <div className="flex items-center gap-3">
              {[5, 10, 15].map(num => (
                <button
                  key={num}
                  onClick={() => setNumQuestions(num)}
                  className={cn(
                    'px-5 py-2 rounded-lg border font-body font-medium text-sm transition-all tabular-nums',
                    numQuestions === num
                      ? 'border-secondary bg-tip-bg text-ink'
                      : 'border-line-light hover:border-secondary/50 text-ink-secondary'
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="callout callout-trap">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Tip about limits */}
          <div className="callout callout-tip">
            <p className="text-sm font-body">
              <strong>💡 Tip:</strong> Start with 5 questions for faster results. The AI may need a moment during peak hours.
            </p>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || selectedTopics.length === 0}
            className="btn btn-primary w-full py-4 text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Professor thinking…
              </>
            ) : (
              <>
                <BrainCircuit className="w-5 h-5" />
                Generate Custom Test
              </>
            )}
          </button>
        </div>
      )}

      {/* --- Generated Quiz --- */}
      {generatedQuestions.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-ink">Your Custom Test</h2>
            <button
              onClick={() => setGeneratedQuestions([])}
              className="btn btn-ghost text-sm"
            >
              ← New Test
            </button>
          </div>
          <QuizEngine questions={generatedQuestions} />
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { BrainCircuit, Loader2, AlertCircle } from 'lucide-react';
import { getAllTopics, QuizQuestion } from '../data/syllabus';
import { QuizEngine } from '../components/QuizEngine';
import { cn } from '../lib/utils';

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
        const errorData = await response.json();
        throw new Error(errorData.error || `API Error: ${response.status}`);
      }

      const result = await response.json();
      let responseText = result.content;

      console.log('Raw AI response:', responseText);

      // Remove markdown code blocks
      responseText = responseText.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '');

      // Try to find JSON object or array
      const firstBrace = responseText.indexOf('{');
      const firstBracket = responseText.indexOf('[');
      const lastBrace = responseText.lastIndexOf('}');
      const lastBracket = responseText.lastIndexOf(']');
      
      let jsonText = '';
      
      // Prefer object format {"questions": [...]}
      if (firstBrace !== -1 && lastBrace !== -1 && firstBrace < lastBrace) {
        jsonText = responseText.substring(firstBrace, lastBrace + 1);
      } 
      // Fallback to array format [...]
      else if (firstBracket !== -1 && lastBracket !== -1 && firstBracket < lastBracket) {
        jsonText = responseText.substring(firstBracket, lastBracket + 1);
      } else {
        throw new Error('AI response does not contain valid JSON. Please try again.');
      }

      // Clean up common issues
      jsonText = jsonText.trim()
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/,\s*([}\]])/g, '$1')
        .replace(/([{,])\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');

      console.log('Cleaned JSON:', jsonText);

      let data;
      try {
        data = JSON.parse(jsonText);
      } catch (parseError: any) {
        console.error('JSON Parse Error:', parseError.message);
        console.error('Failed JSON:', jsonText.substring(0, 500));
        throw new Error('Failed to parse AI response. The AI returned invalid JSON. Please try again.');
      }

      // Handle both {"questions": [...]} and [...] formats
      const questionsArray = Array.isArray(data) ? data : (data.questions || []);
      
      if (!Array.isArray(questionsArray) || questionsArray.length === 0) {
        throw new Error('No questions found in AI response. Please try again.');
      }

      const formattedQuestions: QuizQuestion[] = questionsArray.map((q: any) => {
        let correct: number | string = q.correctAnswer;
        if (q.type === 'mcq') {
          const idx = q.options.findIndex((opt: string) => opt === q.correctAnswer);
          correct = idx !== -1 ? idx : 0;
        }
        return {
          id: q.id,
          type: q.type,
          question: q.question,
          options: q.options,
          correct,
          solution: q.solution
        };
      });

      setGeneratedQuestions(formattedQuestions);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
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

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || selectedTopics.length === 0}
            className="btn btn-primary w-full py-4 text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Test...
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

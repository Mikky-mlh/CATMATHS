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
      const responseText = result.content;

      console.log('Raw AI response:', responseText);

      let jsonText = responseText.trim();

      // Remove markdown code blocks
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```(?:json)?\s*\n?/i, '');
        jsonText = jsonText.replace(/\n?```\s*$/, '');
      }

      jsonText = jsonText.trim();

      // Remove any text before the first [ or {
      const jsonStart = Math.min(
        jsonText.indexOf('[') !== -1 ? jsonText.indexOf('[') : Infinity,
        jsonText.indexOf('{') !== -1 ? jsonText.indexOf('{') : Infinity
      );
      if (jsonStart !== Infinity && jsonStart > 0) {
        jsonText = jsonText.substring(jsonStart);
      }

      // Remove any text after the last ] or }
      const lastBracket = Math.max(jsonText.lastIndexOf(']'), jsonText.lastIndexOf('}'));
      if (lastBracket !== -1 && lastBracket < jsonText.length - 1) {
        jsonText = jsonText.substring(0, lastBracket + 1);
      }

      // Clean up HTML entities
      jsonText = jsonText.replace(/&quot;/g, '"');
      jsonText = jsonText.replace(/&#39;/g, "'");
      jsonText = jsonText.replace(/&lt;/g, '<');
      jsonText = jsonText.replace(/&gt;/g, '>');
      jsonText = jsonText.replace(/&amp;/g, '&');

      // Fix common JSON issues
      jsonText = jsonText.replace(/,\s*([}\]])/g, '$1');
      jsonText = jsonText.replace(/([{,])\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');

      console.log('Extracted JSON:', jsonText);

      let data;
      try {
        data = JSON.parse(jsonText);
      } catch (parseError: any) {
        console.error('JSON Parse Error:', parseError);
        console.error('Failed JSON text:', jsonText);

        try {
          const cleanedJson = jsonText.replace(/\n/g, ' ').replace(/\s+/g, ' ');
          data = JSON.parse(cleanedJson);
          console.log('Successfully parsed after aggressive cleaning');
        } catch (secondError) {
          throw new Error('Failed to parse AI response. The AI returned invalid JSON. Please try again.');
        }
      }

      const formattedQuestions: QuizQuestion[] = data.map((q: any) => {
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

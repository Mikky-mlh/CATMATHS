import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
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
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        throw new Error('Please configure your Gemini API Key in the AI Studio settings.');
      }

      const ai = new GoogleGenAI({ apiKey });
      const topicNames = selectedTopics
        .map(id => allTopics.find(t => t.id === id)?.title)
        .filter(Boolean)
        .join(', ');

      const prompt = `Generate a CAT-level math practice test with ${numQuestions} questions covering these topics: ${topicNames}.
      Return a JSON array of objects. Each object must have:
      - id: a unique number
      - type: either "mcq" or "tita"
      - question: the question text. Use $...$ for inline math and $$...$$ for block math.
      - options: an array of 4 string options (only if type is "mcq", otherwise empty array [])
      - correctAnswer: the exact string of the correct option (for mcq) or the exact numerical answer (for tita)
      - solution: step-by-step explanation. Use $...$ for inline math and $$...$$ for block math.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.INTEGER },
                type: { type: Type.STRING },
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswer: { type: Type.STRING },
                solution: { type: Type.STRING }
              },
              required: ["id", "type", "question", "options", "correctAnswer", "solution"]
            }
          }
        }
      });

      const data = JSON.parse(response.text || '[]');
      
      const formattedQuestions: QuizQuestion[] = data.map((q: any) => {
        let correct: number | string = q.correctAnswer;
        if (q.type === 'mcq') {
          const idx = q.options.findIndex((opt: string) => opt === q.correctAnswer);
          correct = idx !== -1 ? 0 : idx;
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
    <div className="max-w-4xl mx-auto pb-12 space-y-8 animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
          <BrainCircuit className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          AI Custom Test Generator
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Select your topics and let AI generate a personalized CAT-level practice test.
        </p>
      </div>

      {generatedQuestions.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4">1. Select Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {allTopics.map(topic => (
              <label 
                key={topic.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors",
                  selectedTopics.includes(topic.id)
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                    : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                )}
              >
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={selectedTopics.includes(topic.id)}
                  onChange={() => toggleTopic(topic.id)}
                />
                <span className="text-sm font-medium">{topic.title}</span>
              </label>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-4">2. Number of Questions</h2>
          <div className="flex items-center gap-4 mb-8">
            {[5, 10, 15].map(num => (
              <button
                key={num}
                onClick={() => setNumQuestions(num)}
                className={cn(
                  "px-6 py-2 rounded-xl border font-medium transition-colors",
                  numQuestions === num
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                    : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                )}
              >
                {num}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || selectedTopics.length === 0}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Generating Test...
              </>
            ) : (
              <>
                <BrainCircuit className="w-6 h-6" />
                Generate Custom Test
              </>
            )}
          </button>
        </div>
      )}

      {generatedQuestions.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Custom Test</h2>
            <button 
              onClick={() => setGeneratedQuestions([])}
              className="text-sm text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 font-medium"
            >
              ← Create New Test
            </button>
          </div>
          <QuizEngine questions={generatedQuestions} />
        </div>
      )}
    </div>
  );
}

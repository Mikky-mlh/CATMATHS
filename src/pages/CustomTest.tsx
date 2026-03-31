import React, { useState } from 'react';
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
      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey || apiKey === 'MY_GROQ_API_KEY') {
        throw new Error('Please configure your GROQ API Key for CATMATHS components.');
      }

      const topicNames = selectedTopics
        .map(id => allTopics.find(t => t.id === id)?.title)
        .filter(Boolean)
        .join(', ');

      const prompt = `Generate a CAT-level math practice test with ${numQuestions} questions covering these topics: ${topicNames}.

IMPORTANT: Return ONLY a valid JSON array. No explanations, no markdown, no code blocks.

Format:
[
  {
    "id": 1,
    "type": "mcq",
    "question": "Question text here. Use $x^2$ for inline math.",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswer": "Option 1",
    "solution": "Step-by-step solution. Use $x^2$ for inline math."
  },
  {
    "id": 2,
    "type": "tita",
    "question": "Question text here.",
    "options": [],
    "correctAnswer": "42",
    "solution": "Step-by-step solution."
  }
]

Rules:
- Use double quotes for all strings
- No trailing commas
- correctAnswer must be a string
- For mcq: correctAnswer must exactly match one option
- For tita: correctAnswer must be the numerical answer as a string
- Use $...$ for inline math, $$...$$ for block math

Return ONLY the JSON array, starting with [ and ending with ].`;

      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              {
                role: 'system',
                content: 'You are a CAT exam question generator. You MUST respond with ONLY valid JSON. No explanations, no markdown, no code blocks. Just pure JSON starting with [ and ending with ].'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.5,
            max_tokens: 4096
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
      }

      const result = await response.json();
      const responseText = result.choices[0].message.content;
      
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
      jsonText = jsonText.replace(/,\s*([}\]])/g, '$1'); // Remove trailing commas
      jsonText = jsonText.replace(/([{,])\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":'); // Quote unquoted keys
      
      console.log('Extracted JSON:', jsonText);
      
      let data;
      try {
        data = JSON.parse(jsonText);
      } catch (parseError: any) {
        console.error('JSON Parse Error:', parseError);
        console.error('Failed JSON text:', jsonText);
        
        // Try one more time with more aggressive cleaning
        try {
          // Remove all newlines and extra spaces
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

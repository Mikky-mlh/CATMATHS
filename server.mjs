import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/api/generate-questions', async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
  }

  const { topicNames, numQuestions } = req.body;
  if (!topicNames || !numQuestions) {
    return res.status(400).json({ error: 'topicNames and numQuestions required' });
  }

  const prompt = `Generate a CAT-level math practice test with ${numQuestions} questions covering these topics: ${topicNames}.

IMPORTANT: Return ONLY a valid JSON object with a "questions" array. No explanations, no markdown.

Format:
{
  "questions": [
    {
      "id": 1,
      "type": "mcq",
      "question": "Question text here. Use $x^2$ for inline math.",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": "Option 1",
      "solution": "Step-by-step solution. Use $x^2$ for inline math."
    }
  ]
}

Rules:
- Use double quotes for all strings
- No trailing commas
- correctAnswer must be a string
- For mcq: correctAnswer must exactly match one option
- For tita: correctAnswer must be the numerical answer as a string
- Use $...$ for inline math, $$...$$ for block math`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a CAT exam question generator. You MUST respond with ONLY valid JSON. No explanations, no markdown, no code blocks. Just pure JSON starting with { and ending with }.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.5,
        max_tokens: 4096,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        return res.status(502).json({ error: `Groq API error: ${response.status}` });
      }
      return res.status(502).json({ error: errorData.error?.message || `Groq API error: ${response.status}` });
    }

    let result;
    try {
      result = await response.json();
    } catch {
      return res.status(502).json({ error: 'Groq API returned incomplete response. Try fewer questions.' });
    }

    const responseText = result.choices?.[0]?.message?.content;
    if (!responseText) {
      return res.status(502).json({ error: 'Groq API returned empty response.' });
    }

    return res.json({ content: responseText });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

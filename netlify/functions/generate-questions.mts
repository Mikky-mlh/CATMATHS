import type { Config } from "@netlify/functions";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const apiKey = Netlify.env.get("GROQ_API_KEY");
  if (!apiKey) {
    return Response.json(
      { error: "GROQ_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  let body: { topicNames: string; numQuestions: number };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { topicNames, numQuestions } = body;
  if (!topicNames || !numQuestions) {
    return Response.json(
      { error: "topicNames and numQuestions are required." },
      { status: 400 }
    );
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
- Use $...$ for inline math, $$...$$ for block math
- CRITICAL: Always use proper LaTeX syntax with backslashes: \\frac{a}{b}, \\sqrt{x}, \\pi, \\theta
- NEVER write rac{} or sqrt{} - always include the backslash: \\frac, \\sqrt
- Example: "$\\frac{1}{3} \\pi r^2 h$" NOT "$rac{1}{3} pi r^2 h$"`;

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are a CAT exam question generator. You MUST respond with ONLY valid JSON. CRITICAL: Use proper LaTeX with backslashes: \\\\frac NOT frac, \\\\sqrt NOT sqrt, \\\\pi NOT pi.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.5,
          max_tokens: 4096,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        return Response.json(
          { error: `Groq API error: ${response.status} ${response.statusText}` },
          { status: 502 }
        );
      }
      return Response.json(
        { error: errorData.error?.message || `Groq API error: ${response.status}` },
        { status: 502 }
      );
    }

    let result;
    try {
      result = await response.json();
    } catch (jsonError) {
      return Response.json(
        { error: "Groq API returned incomplete response. Try fewer questions or wait a moment." },
        { status: 502 }
      );
    }

    const responseText = result.choices?.[0]?.message?.content;
    
    if (!responseText) {
      return Response.json(
        { error: "Groq API returned empty response. Please try again." },
        { status: 502 }
      );
    }

    return Response.json({ content: responseText });
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
};

export const config: Config = {
  path: "/api/generate-questions",
  method: "POST",
};
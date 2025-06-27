const axios = require('axios');
require('dotenv').config();

const generateQuestions = async (topic,count,level) => {
  const prompt = `Generate ${count} multiple-choice questions on the topic "${topic}" with ${level} difficulty level.

Difficulty guidelines:
- Easy: Basic concepts, definitions, and straightforward facts
- Medium: Application of concepts, moderate analysis, and connections between ideas
- Hard: Complex analysis, synthesis of multiple concepts, and advanced problem-solving

Each question should have 4 options (a, b, c, d) and specify the correct answer as "answer: <option letter>".
Format as JSON like:
[
  {
    "question": "What is ...?",
    "options": {
      "a": "...",
      "b": "...",
      "c": "...",
      "d": "..."
    },
    "answer": "a"
  }
]

Return only the JSON array, no additional text.`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  const content = response.data.candidates[0].content.parts[0].text;
  
  // Parse the JSON response
  try {
    // Clean the response in case it has markdown formatting
    const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
    const json = JSON.parse(cleanContent);
    return json;
  } catch (err) {
    throw new Error(`Failed to parse AI response as JSON: ${err.message}`);
  }
};

module.exports = generateQuestions ;
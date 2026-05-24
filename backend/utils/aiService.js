const axios = require("axios");
require("dotenv").config();

const generateQuestions = async (topic, count, level) => {
  const prompt = `
Generate ${count} multiple-choice questions on "${topic}" with ${level} difficulty.

Rules:
- Return only quiz data
- Each question must have:
  - question
  - options (a, b, c, d)
  - answer
- answer must be one of: a, b, c, d
`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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

          // Force JSON output
          responseMimeType: "application/json",

          // Structured output schema
          responseSchema: {
            type: "ARRAY",

            items: {
              type: "OBJECT",

              properties: {
                question: {
                  type: "STRING"
                },

                options: {
                  type: "OBJECT",

                  properties: {
                    a: { type: "STRING" },
                    b: { type: "STRING" },
                    c: { type: "STRING" },
                    d: { type: "STRING" }
                  },

                  required: ["a", "b", "c", "d"]
                },

                answer: {
                  type: "STRING",
                  enum: ["a", "b", "c", "d"]
                }
              },

              required: ["question", "options", "answer"]
            }
          }
        }
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const content =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error("Empty response from Gemini");
    }

    // Parse JSON
    const questions = JSON.parse(content);

    // Extra backend validation
    if (!Array.isArray(questions)) {
      throw new Error("Invalid response format");
    }

    questions.forEach((q, index) => {
      if (
        !q.question ||
        !q.options ||
        !q.answer
      ) {
        throw new Error(`Invalid question at index ${index}`);
      }

      const validAnswers = ["a", "b", "c", "d"];

      if (!validAnswers.includes(q.answer)) {
        throw new Error(`Invalid answer at index ${index}`);
      }
    });

    return questions;

  } catch (error) {
    console.error(
      "Gemini API Error:",
      error.response?.data || error.message
    );

    throw new Error("Failed to generate quiz questions");
  }
};

module.exports = generateQuestions;
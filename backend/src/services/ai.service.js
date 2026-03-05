const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const invokeGeminiAi = async () => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Hello Gemini! Explain what is an Interview?",
  });

  console.log(response.text);
};

module.exports = invokeGeminiAi;

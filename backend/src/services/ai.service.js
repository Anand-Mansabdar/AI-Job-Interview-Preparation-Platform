const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

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

const interviewReportSchema = z.object({
  matchScore: z.number().description("A score between 0 to 100 indicating how well the candidates profile matches the job description"),
  technicalQuestions: z.array(z.object({
    question: z.string().description("The technical questions that can be asked by interviewers"),
    intention: z.string().description("The intention of the interviewer behind asking this question"),
    answer: z.string().description("How to answer this question, what points to cover, what approach to take etc...")
  })).description("The technical questions that can be asked in the interview and how to approach them."),
  behavioralQuestions: z.array(z.object({
    question: z.string().description("The technical questions that can be asked by interviewers"),
    intention: z.string().description("The intention of the interviewer behind asking this question"),
    answer: z.string().description("How to answer this question, what points to cover, what approach to take etc...")
  })).description("The behavioral questions that can be asked in the interview and how to approach them."),
  skillGaps: z.array(z.object({
    skill: z.string().description("The skills in which the candidate lacks"),
    severity: z.enum(["low", "medium", "high"]).description("The severity of the skill gap")
  })).description("List of all the skill gaps in the candidates profile along with severity"),
  preparationPlan: z.array(z.object({
    day: z.number().description("The number of days required to be prepared"),
    focus: z.string().description("The main focus of the current day in the preparation"),
    tasks: z.array(z.string().description("List of tasks to be completed on the current day"))
  })).description("A day-wise preparation plan for the candidate to follow in order to get stronger in concepts")
});

const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {};

module.exports = invokeGeminiAi;

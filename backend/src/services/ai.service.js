const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// const invokeGeminiAi = async () => {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Hello Gemini! Explain what is an Interview?",
//   });

//   console.log(response.text);
// };

const interviewReportSchema = z.object({
  matchScore: z.number().describe("A score between 0 to 100 indicating how well the candidates profile matches the job description"),
  technicalQuestions: z.array(z.object({
    question: z.string().describe("The technical questions that can be asked by interviewers"),
    intention: z.string().describe("The intention of the interviewer behind asking this question"),
    answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc...")
  })).describe("The technical questions that can be asked in the interview and how to approach them."),
  behavioralQuestions: z.array(z.object({
    question: z.string().describe("The technical questions that can be asked by interviewers"),
    intention: z.string().describe("The intention of the interviewer behind asking this question"),
    answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc...")
  })).describe("The behavioral questions that can be asked in the interview and how to approach them."),
  skillGaps: z.array(z.object({
    skill: z.string().describe("The skills in which the candidate lacks"),
    severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap")
  })).describe("List of all the skill gaps in the candidates profile along with severity"),
  preparationPlan: z.array(z.object({
    day: z.number().describe("The number of days required to be prepared"),
    focus: z.string().describe("The main focus of the current day in the preparation"),
    tasks: z.array(z.string().describe("List of tasks to be completed on the current day"))
  })).describe("A day-wise preparation plan for the candidate to follow in order to get stronger in concepts")
});

const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const prompt = `Generate an interview report for a candidate with the following details: 
  Resume: ${resume}
  Self Description: ${selfDescription},
  Job Description: ${jobDescription} `

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema)
    }
  })
  return JSON.parse(response.text)
  // console.log(JSON.parse(response.text))
};

module.exports = generateInterviewReport;

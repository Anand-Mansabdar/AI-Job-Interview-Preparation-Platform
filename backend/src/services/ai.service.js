const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 to 100 indicating how well the candidates profile matches the job description",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The technical questions that can be asked by interviewers",
          ),
        intention: z
          .string()
          .describe(
            "The intention of the interviewer behind asking this question",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc...",
          ),
      }),
    )
    .describe(
      "The technical questions that can be asked in the interview and how to approach them.",
    ),
  behaviouralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The technical questions that can be asked by interviewers",
          ),
        intention: z
          .string()
          .describe(
            "The intention of the interviewer behind asking this question",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc...",
          ),
      }),
    )
    .describe(
      "The behavioural questions that can be asked in the interview and how to approach them.",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skills in which the candidate lacks"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("The severity of the skill gap"),
      }),
    )
    .describe(
      "List of all the skill gaps in the candidates profile along with severity",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z.number().describe("The number of days required to be prepared"),
        focus: z
          .string()
          .describe("The main focus of the current day in the preparation"),
        tasks: z.array(
          z
            .string()
            .describe("List of tasks to be completed on the current day"),
        ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to get stronger in concepts",
    ),
});

const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const prompt = `Generate a comprehensive interview report for a candidate with the following details: 

Resume: ${resume}

Self Description: ${selfDescription}

Job Description: ${jobDescription}

You must provide a JSON response with the following structure:
- matchScore: A number between 0-100 indicating how well the candidate matches the job
- technicalQuestions: An array of at least 5-10 technical questions, each with:
  - question: The technical question
  - intention: Why the interviewer asks this
  - answer: How to answer it effectively
- behaviouralQuestions: An array of at least 5 behavioural questions, each with:
  - question: The behavioural question
  - intention: Why the interviewer asks this
  - answer: How to answer it effectively
- skillGaps: An array of skill gaps, each with:
  - skill: The skill name
  - severity: "low", "medium", or "high"
- preparationPlan: An array of at least 7-14 days, each with:
  - day: Day number
  - focus: Main focus for that day
  - tasks: Array of specific tasks to complete

Ensure all arrays contain actual data, not empty arrays.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          matchScore: {
            type: "number",
            description:
              "A score between 0 to 100 indicating how well the candidates profile matches the job description",
          },
          technicalQuestions: {
            type: "array",
            description:
              "The technical questions that can be asked in the interview and how to approach them",
            items: {
              type: "object",
              properties: {
                question: {
                  type: "string",
                  description:
                    "The technical questions that can be asked by interviewers",
                },
                intention: {
                  type: "string",
                  description:
                    "The intention of the interviewer behind asking this question",
                },
                answer: {
                  type: "string",
                  description:
                    "How to answer this question, what points to cover, what approach to take",
                },
              },
              required: ["question", "intention", "answer"],
            },
          },
          behaviouralQuestions: {
            type: "array",
            description:
              "The behavioural questions that can be asked in the interview and how to approach them",
            items: {
              type: "object",
              properties: {
                question: {
                  type: "string",
                  description:
                    "The behavioural questions that can be asked by interviewers",
                },
                intention: {
                  type: "string",
                  description:
                    "The intention of the interviewer behind asking this question",
                },
                answer: {
                  type: "string",
                  description:
                    "How to answer this question, what points to cover, what approach to take",
                },
              },
              required: ["question", "intention", "answer"],
            },
          },
          skillGaps: {
            type: "array",
            description:
              "List of all the skill gaps in the candidates profile along with severity",
            items: {
              type: "object",
              properties: {
                skill: {
                  type: "string",
                  description: "The skills in which the candidate lacks",
                },
                severity: {
                  type: "string",
                  enum: ["low", "medium", "high"],
                  description: "The severity of the skill gap",
                },
              },
              required: ["skill", "severity"],
            },
          },
          preparationPlan: {
            type: "array",
            description:
              "A day-wise preparation plan for the candidate to follow",
            items: {
              type: "object",
              properties: {
                day: {
                  type: "number",
                  description: "The day number in the preparation plan",
                },
                focus: {
                  type: "string",
                  description:
                    "The main focus of the current day in the preparation",
                },
                tasks: {
                  type: "array",
                  description:
                    "List of tasks to be completed on the current day",
                  items: {
                    type: "string",
                  },
                },
              },
              required: ["day", "focus", "tasks"],
            },
          },
        },
        required: [
          "matchScore",
          "technicalQuestions",
          "behaviouralQuestions",
          "skillGaps",
          "preparationPlan",
        ],
      },
    },
  });

  // console.log("Raw AI Response:", response.text);
  const parsedResponse = JSON.parse(response.text);
  // console.log("Parsed AI Response:", JSON.stringify(parsedResponse, null, 2));

  return parsedResponse;
};

module.exports = generateInterviewReport;

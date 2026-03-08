const pdfParser = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

const generateReport = async (req, res) => {
  const resumeContent = await new pdfParser.PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();
  const { selfDescription, jobDescription } = req.body;

  const interviewReportResponse = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  // console.log("AI Response:", JSON.stringify(interviewReportResponse, null, 2));

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportResponse,
  });

  return res.status(201).json({
    message: "Interview Report Generated Successfully",
    interviewReport,
  });
};

module.exports = { generateReport };

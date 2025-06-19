// import Contest from "../models/Contest.js";
// import problems from "../models/problems.js";
import axios from "axios";
import Contest from "../models/ContestModel.js";
import Problem from "../models/ProblemModel.js";
import Submission from "../models/SubmissionModel.js";

const getAllContests = async (req, res) => {
  try {
    const contests = await Contest.find().sort({ startTime: -1 });
    res.status(200).json(contests);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching Contests",
      error: err.message,
    });
  }
};

const getContestById = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id).populate(
      "createdBy",
      "name email profilePicture"
    );
    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }
    res.status(200).json(contest);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching contest details", error: err.message });
  }
};

const getProblemByIds = async (req, res) => {
  try {
    const { ids } = req.body;
    // console.log(ids);

    if (!Array.isArray(ids)) {
      return res
        .status(400)
        .json({ error: "Invalid input, expected array of IDs" });
    }

    const AllProblems = await Problem.find({ _id: { $in: ids } });
    res.json(AllProblems);
  } catch (error) {
    console.error("Batch fetch error:", error);
    res.status(500).json({ error: "Failed to fetch problems" });
  }
};

const getSingleProblemById = async (req, res) => {
  try {
    // const { pid } = req.params;
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const judge0BaseUrl = "https://judge0-ce.p.rapidapi.com/submissions";

const submitSolution = async (req, res) => {
  const { code, language, pid } = req.body;
  const userId = req.user?._id; // if auth middleware sets this

  if (!code || !language || !pid) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const languageIdMap = { cpp: 54, python: 71, java: 62 };

  try {
    const problem = await Problem.findById(pid);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    const publicTestcases = problem.testcases.filter((tc) => tc.isPublic);
    if (!publicTestcases.length)
      return res.status(400).json({ error: "No public testcases" });

    const testResults = [];
    let totalExecutionTime = 0;

    for (let i = 0; i < publicTestcases.length; i++) {
      const { input, expectedOutput } = publicTestcases[i];

      const judgePayload = {
        source_code: code,
        language_id: languageIdMap[language] || 54,
        stdin: input,
        expected_output: expectedOutput,
      };

      const judgeResponse = await axios.post(judge0BaseUrl, judgePayload, {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.JUDGE_O_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        params: { base64_encoded: "false", wait: "true" },
      });

      const result = judgeResponse.data;
      console.log(result);
      totalExecutionTime += result.time ? parseFloat(result.time) : 0;

      const isCorrect = result.status?.description === "Accepted";

      testResults.push({
        testCaseNumber: i + 1,
        input,
        expectedOutput,
        userOutput: result.stdout?.trim(),
        status: result.status?.description,
        correct: isCorrect,
      });
    }

    const passedCount = testResults.filter((r) => r.correct).length;

    const submission = new Submission({
      user: req.user._id, // ✅ not userId
      problem: problem._id, // ✅ not problemId
      // contestId: contest._id, // if available
      language,
      code,
      results: testResults,
      passedCases: passedCount,
      totalCases: testResults.length,
      status: passedCount === testResults.length ? "Accepted" : "Wrong Answer",
      executionTime: totalExecutionTime / testResults.length,
    });

    // console.log(submission);

    const saved = await submission.save();

    res.status(200).json({ submissionId: saved._id }); // ✅ Return ID only
  } catch (err) {
    console.error("Submit error:", err);
    res.status(500).json({ error: "Submission failed", details: err.message });
  }
};

export {
  getContestById,
  getAllContests,
  getProblemByIds,
  getSingleProblemById,
  submitSolution,
};

import mongoose from "mongoose";

const testCaseResultSchema = new mongoose.Schema({
  testCaseNumber: Number,
  input: String,
  expectedOutput: String,
  userOutput: String,
  status: String, // e.g., "Accepted", "Wrong Answer", "Time Limit Exceeded"
  correct: Boolean,
});

const aiFeedbackSchema = new mongoose.Schema({
  summary: String, // e.g., "Code is efficient but could improve readability"
  issues: [String], // e.g., ["Too many nested loops", "Poor variable names"]
  suggestions: [String], // e.g., ["Use descriptive variable names", "Try optimizing recursion"]
  similarityScore: Number, // % of match with other codes
  category: String, // e.g., "Plagiarized", "Original", "Template-based"
});

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },         // ✅ changed from userId
  problem: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },   // ✅ changed from problemId
  contestId: { type: mongoose.Schema.Types.ObjectId, ref: "Contest" }, // optional

  language: { type: String, required: true },
  code: { type: String, required: true },

  results: [testCaseResultSchema],
  passedCases: Number,
  totalCases: Number,

  status: {
    type: String,
    enum: ["Accepted", "Wrong Answer", "Runtime Error", "Compilation Error", "Time Limit Exceeded", "Partial"],
    default: "Pending",
  },

  submittedAt: { type: Date, default: Date.now },

  aiFeedback: aiFeedbackSchema,
  isPlagiarized: { type: Boolean, default: false },
  executionTime: Number,
  memoryUsed: Number,

  feedbackGiven: { type: Boolean, default: false },
  ratingGiven: { type: Boolean, default: false },
});

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
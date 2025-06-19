import mongoose from "mongoose";




const exampleSchema = new mongoose.Schema({
  input: String,
  output: String,
  explanation: String
});

const testcaseSchema = new mongoose.Schema({
  input: String,
  expectedOutput: String,
  isPublic: {
    type: Boolean,
    default: false
  }
});

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  statement: { type: String, required: true }, // Full Markdown/HTML
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium"
  },
  timeLimit: {
    type: Number, // in milliseconds
    default: 2000
  },
  memoryLimit: {
    type: Number, // in MB
    default: 256
  },
  examples: [exampleSchema],
  testcases: [testcaseSchema],
  maxScore: {
    type: Number,
    default: 100
  },
  tags: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;

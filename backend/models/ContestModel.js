import mongoose from "mongoose";



const contestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Admin
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  eligibility: {
    type: String,
    default: "Open to all",
  },
  tags: [String], // e.g., ["AI", "Security", "Face-Auth"]
  evaluationMode: {
    type: String,
    enum: ["manual", "auto"],
    default: "auto",
  },
  problems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem"
    }
  ],
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
    default: "upcoming"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contest = mongoose.model("Contest", contestSchema);
export default Contest;

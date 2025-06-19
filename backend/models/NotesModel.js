import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problemId: {
      type: String,
      required: true,
    },
    contestId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const Note = mongoose.model("Note", noteSchema);
export default Note;
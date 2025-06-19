import express from "express";
import Note from "../models/NotesModel.js";
import requireAuth from "../middleware/requireAuth.js";

const cfProblemsRouter = express.Router();

cfProblemsRouter.post("/addNotes",requireAuth, async (req, res) => {
  const { problemId, contestId, title, content } = req.body;
  if (!problemId || !contestId || !content) {
    return res.status(400).json({ error: "Missing fields" });
  }
  try {
    const existingNote = await Note.findOne({ problemId, contestId });
    if (existingNote) {
      existingNote.content = content;
      existingNote.title = title;
      await existingNote.save();
      return res
        .status(200)
        .json({ message: "Note updated", note: existingNote });
    }

    const newNoteStuffs = {
      userId: req.user._id,
      problemId,
      contestId,
      title,
      content,
    };

    const newNote = new Note(newNoteStuffs);
    await newNote.save();
    res.status(201).json({ message: "Note saved", note: newNote });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default cfProblemsRouter;

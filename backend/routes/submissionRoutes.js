import express from "express";
import Submission from "../models/SubmissionModel.js";
import requireAuth from "../middleware/requireAuth.js";

const submissionRouter = express.Router();


submissionRouter.get("/all-submissions", requireAuth ,async (req,res) => {
    try {
        const submissions = await Submission.find({user: req.user._id}).populate("problem", "title contestId").sort({submittedAt : -1});
        console.log(submissions);
        
        res.status(200).json(submissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "Failed to fetch Submissions"});
    }
})



submissionRouter.get("/:id", requireAuth, async (req, res) => {
  try {

    const sub = await Submission.findById(req.params.id).populate("problem user");
    if (!sub) return res.status(404).json({ error: "Submission not found" });
    res.status(200).json(sub);


  } catch (error) {
    console.error("Fetch submission error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default submissionRouter;

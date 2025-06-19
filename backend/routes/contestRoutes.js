import express from "express";
import {
  getAllContests,
  getContestById,
  getProblemByIds,
  getSingleProblemById,
  submitSolution,
} from "../controllers/contestControllers.js";
import requireAuth from "../middleware/requireAuth.js";

const contestRouter = express.Router();

contestRouter.get("/contests" ,requireAuth ,getAllContests);

contestRouter.get("/contests/:id", requireAuth, getContestById);

contestRouter.post("/contests/problems/batch", requireAuth , getProblemByIds);

contestRouter.get("/contests/problem/:id", requireAuth , getSingleProblemById);

contestRouter.post("/contests/problem/submit", requireAuth , submitSolution);

export default contestRouter;

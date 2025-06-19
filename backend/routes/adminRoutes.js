import express from "express";
import { createContest } from "../controllers/adminContestControllers.js";
import requireAuth from "../middleware/requireAuth.js";

const adminRouter = express.Router();

adminRouter.post("/contests/create-contest", requireAuth,createContest )

export default adminRouter;
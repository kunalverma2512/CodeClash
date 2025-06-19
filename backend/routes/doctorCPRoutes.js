import express from "express";
import diagnoseUser from "../controllers/doctorCPControllers.js";
import requireAuth from "../middleware/requireAuth.js";



const doctorCPRouter = express.Router();


doctorCPRouter.post("/diagnose", requireAuth ,diagnoseUser)


export default doctorCPRouter;
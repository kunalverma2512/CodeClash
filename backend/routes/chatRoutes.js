import express from "express";
import { getAllMessages } from "../controllers/globalChatController.js";

const chatRouter = express.Router();


chatRouter.get("/getAllMessages",getAllMessages);

export default chatRouter;
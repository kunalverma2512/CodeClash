import express from "express";
import User from "../models/User.js";
import requireAuth from "../middleware/requireAuth.js";
import axios from "axios";
import { syncCodeforcesData } from "../controllers/codeforcesControllers.js";

const codeForcesRouter = express.Router();

codeForcesRouter.post("/connect-cf/requestCFVerification", requireAuth , async (req, res) => {
  const { handle } = req.body;

  if (!handle) {
    return res.status(400).json({
      message: "Please enter your codeforces handle",
      process: "Failed"
    });
  }
  const code = Math.random().toString(36).substring(2, 10);
  await User.updateOne(
    { _id: req.user._id },
    { cfTempCode: code, cfTempHandle: handle, cfTempCreatedAt: new Date() }
  );

  res.json({
    message: "verification code Generated",
    verificationCode: code,
    instruction: `Please paste this code in your Codeforces profile's 'About Me' section temporarily: ${code}`,
  });
});

codeForcesRouter.post(
  "/connect-cf/verifyCFHandle",
  requireAuth,
  async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user.cfTempHandle || !user.cfTempCode) {
      return res.status(400).json({ message: "No Verification Pending" });
    }

    const resp = await axios.get(
      `https://codeforces.com/api/user.info?handles=${user.cfTempHandle}`
    );
    const lastname = resp.data.result[0].lastName || "";
    if (lastname.includes(user.cfTempCode)) {
      user.cfHandle = user.cfTempHandle;
      user.cfTempHandle = undefined;
      user.cfTempCode = undefined;
      user.cfTempCreatedAt = undefined;
      await user.save();
      return res.json({ message: "Codeforces  linked to you codeClash Account successfully!" });
    } else {
      return res.status(400).json({
        message:
          "Verification code not found. Ensure it’s added to lastName. Then try again.",
        cfhandle: user.cfHandle,
      });
    }
  }
);



codeForcesRouter.post("/codeforces/sync/codeforces",requireAuth,syncCodeforcesData)

export default codeForcesRouter;

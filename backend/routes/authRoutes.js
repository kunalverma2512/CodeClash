import express from "express";
import passport from "passport";

const authRouter = express.Router();

authRouter.get("/google", (req,res,next)=> {
  const state = req.query.state;
  
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state
  })(req,res,next);
});

authRouter.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { failureRedirect: "/auth/failure" }, (err, user) => {
    if (err || !user) {
      // ❌ If there's a role conflict or user is not found

      return res.redirect(
        `${process.env.CLIENT_URL}/admin-login-error`
      );

      // return res.redirect(
      //   "http://localhost:5173/unauthorized?message=" +
      //     encodeURIComponent(err?.message || "Login failed")
      // );
    }

    // ✅ No error — log the user in
    req.logIn(user, (err) => {
      if (err) return next(err);

      // Redirect based on role
      if (user.role === "admin") {
        return res.redirect(`${process.env.CLIENT_URL}/admin-dashboard`);
      } else {
        return res.redirect(`${process.env.CLIENT_URL}/dashboard`);
      }
    });
  })(req, res, next);
});

authRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.redirect(`${process.env.CLIENT_URL}`);
  });
});

authRouter.get("/user", (req, res) => {
  // Assuming user data is stored in a session or token
  if (req.user) {
    // Send the authenticated user data if available
    console.log(req.user);
    
    res.json(req.user);
  } else {
    // Send null or an error message if no user is authenticated
    res.status(401).json({ message: "User not authenticated" });
  }
});

export default authRouter;

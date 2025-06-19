import express from "express";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { Server } from 'socket.io';
import connectDB from "./config/mongodb.js";
import passport from "./config/passport.js";
import authRouter from "./routes/authRoutes.js";
import session from "express-session";
import contestRouter from "./routes/contestRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import submissionRouter from "./routes/submissionRoutes.js";
import cfProblemsRouter from "./routes/cfProblemsRoutes.js";
import codeForcesRouter from "./routes/codeForcesRoutes.js";
import AIRouter from "./routes/aiRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import { saveMessage } from "./controllers/globalChatController.js";
import doctorCPRouter from "./routes/doctorCPRoutes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});


const PORT = process.env.PORT || 4000;

connectDB();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

// middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());



app.use("/auth", authRouter);
app.use("/dashboard",contestRouter);
app.use("/dashboard/submissions",submissionRouter);
app.use("/codeforces-link",codeForcesRouter);
app.use("/cf-problems", cfProblemsRouter);
app.use("/api/ai",AIRouter)
app.use("/admin-dashboard", adminRouter )
app.use("/discussion", chatRouter);
app.use("/api/doctor-cp",doctorCPRouter)

/**
 * SOCKET.IO CONNECTION HANDLING
 */
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🔌 A user connected");

  // Listen for user details after connection
  socket.on("userConnected", (userData) => {
    console.log("✅ User joined:", userData.name);
    onlineUsers.set(socket.id, {
      _id: userData._id,
      name: userData.name,
      profilePicture: userData.profilePicture,
    });

    // Broadcast updated list to all clients
    io.emit("updateOnlineUsers", Array.from(onlineUsers.values()));
  });

  // Handle chat messages
  socket.on("sendMessage", async ({ content, sender }) => {
    try {
      const savedMsg = await saveMessage(content, sender);
      const populatedMsg = await savedMsg.populate("sender", "name profilePicture _id");
      io.emit("receiveMessage", populatedMsg); // broadcast to all
    } catch (err) {
      console.error("❌ Message saving failed:", err);
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("❌ A user disconnected");

    // Remove user from online list
    onlineUsers.delete(socket.id);

    // Broadcast updated online users
    io.emit("updateOnlineUsers", Array.from(onlineUsers.values()));
  });
});



// Start listening
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

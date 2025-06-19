import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  // 👉 Basic Google Auth Info
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // 👉 Role (admin or participant)
  role: {
    type: String,
    required: true,
    enum: ["admin", "participant"],
    default: "participant",
  },

  // ✅ Codeforces Handle Verification
  cfHandle: {
    type: String,
    default: "", // Final verified handle
  },
  cfTempHandle: {
    type: String, // Temporary handle before verification
  },
  cfTempCode: {
    type: String, // Random code to verify CF handle
  },
  cfTempCreatedAt: {
    type: Date, // Timestamp to expire
  },

  // ✅ Rating System
  rating: {
    type: Number,
    default: 0,
  },
  maxRating: {
    type: Number,
    default: 0,
  },

  // ✅ Problem Stats
  totalSolved: {
    type: Number,
    default: 0,
  },
  totalAttempts: {
    type: Number,
    default: 0,
  },
  accuracy: {
    type: Number,
    default: 0.0, // percentage (calculated on backend)
  },

  // ✅ Streaks
  currentStreak: {
    type: Number,
    default: 0,
  },
  maxStreak: {
    type: Number,
    default: 0,
  },
  lastSubmissionDate: {
    type: Date,
  },

  // ✅ Badges and Achievements
  badges: [
    {
      type: String,
    },
  ],

  // ✅ Contest Participation (Optional for future)
  contests: [
    {
      contestId: String,
      rank: Number,
      ratingChange: Number,
      newRating: Number,
      date: Date,
    },
  ],

  // ✅ AI Usage Stats (Optional)
  aiQueriesUsed: {
    type: Number,
    default: 0,
  },

  // ✅ Codeforces Stats
  codeforcesUsername: { type: String },
  codeforcesRating: { type: Number, default: 0 },
  codeforcesMaxRating: { type: Number, default: 0 },
  codeforcesRank: { type: String },
  codeforcesMaxRank: { type: String },

  codeforcesTotalSolved: { type: Number, default: 0 },
  codeforcesTotalSubmissions: { type: Number, default: 0 },
  codeforcesAccuracy: { type: Number, default: 0 },

  codeforcesTopicStats: [
    {
      tag: { type: String },
      solved: { type: Number },
    },
  ],

  codeforcesVerdictStats: [
    {
      verdict: { type: String },
      count: { type: Number },
    },
  ],

  codeforcesMonthlyActivity: [
    {
      month: { type: String },
      year: { type: Number },
      solved: { type: Number },
    },
  ],

  codeforcesLastSyncedAt: { type: Date },

  codeforcesContests: [
    {
      contestId: Number,
      contestName: String,
      rank: Number,
      oldRating: Number,
      newRating: Number,
      ratingChange: Number,
      date: Date,
    },
  ],
});

// TTL index to auto-delete unverified Codeforces handle after 10 minutes
UserSchema.index({ cfTempCreatedAt: 1 }, { expireAfterSeconds: 600 });

const User = mongoose.model("User", UserSchema);

export default User;

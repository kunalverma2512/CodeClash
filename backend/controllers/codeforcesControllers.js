import express from "express";
import User from "../models/User.js";
import axios from "axios";

export const syncCodeforcesData = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const handle = user.cfHandle;

    if (!handle) {
      return res.status(400).json({
        error: "No Codeforces handle linked",
      });
    }

    // 👉 Get user info
    const infoRes = await axios.get(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );
    const info = infoRes.data.result[0];

    // 👉 Get user submissions
    const submissionRes = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle}`
    );
    const submissions = submissionRes.data.result;

    // 👉 Get contest history
    const contestRes = await axios.get(
      `https://codeforces.com/api/user.rating?handle=${handle}`
    );
    const contests = contestRes.data.result;

    // 👇 INIT all data maps
    let solvedSet = new Set();
    let attemptsMap = {};
    const verdictStatsMap = {};
    const activityMap = {};
    const topicMap = {};

    // 👉 Analyze Submissions
    submissions.forEach((sub) => {
      const problemId = `${sub.problem.contestId}-${sub.problem.index}`;

      // Solved / Attempt logic
      if (sub.verdict === "OK") {
        solvedSet.add(problemId);
        
        // Topic tags (only on correct submissions)
        const tags = sub.problem.tags || [];
        tags.forEach((tag) => {
          topicMap[tag] = (topicMap[tag] || 0) + 1;
        });
      }

      attemptsMap[problemId] = (attemptsMap[problemId] || 0) + 1;

      // Verdict Stats
      const verdict = sub.verdict || "UNKNOWN";
      verdictStatsMap[verdict] = (verdictStatsMap[verdict] || 0) + 1;

      // Monthly Activity
      const date = new Date(sub.creationTimeSeconds * 1000);
      const month = date.getMonth();
      const year = date.getFullYear();
      const key = `${month}-${year}`;
      activityMap[key] = (activityMap[key] || 0) + 1;
    });

    // 👉 Format Data
    const totalSolved = solvedSet.size;
    const totalAttempts = Object.values(attemptsMap).reduce((a, b) => a + b, 0);
    const accuracy =
      totalAttempts === 0
        ? 0
        : ((totalSolved / totalAttempts) * 100).toFixed(2);

    const verdictStats = Object.entries(verdictStatsMap).map(
      ([verdict, count]) => ({
        verdict,
        count,
      })
    );

    const topicStats = Object.entries(topicMap).map(([tag, solved]) => ({
      tag,
      solved,
    }));

    const monthlyActivity = Object.entries(activityMap).map(([key, solved]) => {
      const [month, year] = key.split("-");
      return {
        month: parseInt(month),
        year: parseInt(year),
        solved,
      };
    });

    const contestHistory = contests.map((contest) => ({
      contestId: contest.contestId,
      contestName: contest.contestName,
      rank: contest.rank,
      oldRating: contest.oldRating,
      newRating: contest.newRating,
      ratingChange: contest.newRating - contest.oldRating,
      date: new Date(contest.ratingUpdateTimeSeconds * 1000),
    }));

    // ✅ Update user
    user.codeforcesRating = info.rating || 0;
    user.codeforcesMaxRating = info.maxRating || 0;
    user.codeforcesRank = info.rank || "";
    user.codeforcesMaxRank = info.maxRank || "";
    user.codeforcesTotalSolved = totalSolved;
    user.codeforcesTotalSubmissions = totalAttempts;
    user.codeforcesAccuracy = parseFloat(accuracy);
    user.codeforcesVerdictStats = verdictStats;
    user.codeforcesMonthlyActivity = monthlyActivity;
    user.codeforcesTopicStats = topicStats;
    user.codeforcesContests = contestHistory;
    user.codeforcesLastSyncedAt = new Date();
    
    await user.save();

    return res.json({ message: "Codeforces data synced successfully." });
  } catch (error) {
    console.error("Sync error:", error);
    return res.status(500).json({ error: "Failed to sync Codeforces data." });
  }
};

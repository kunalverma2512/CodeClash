// /routes/diagnoseUser.js
import User from "../models/User.js";
import { getGeminiResponse } from "../utils/geminiApi.js";

const diagnoseUser = async (req, res) => {
  const userID = req.user._id;
  const user = await User.findById(userID);
  // console.log("USER DATA : ",user);
  
  const {
    complaint,
    selected,
    routine,
    goals,
    mood,
    experience,
    hoursPerDay,
    platformIssues,
  } = req.body;

// const prompt = `
// You're an expert Competitive Programming coach, speaking like a confident and friendly mentor.

// Your job is to analyze the student's condition and write a **high-quality performance blueprint** for them.

// ✅ Tone: Confident, Friendly, Motivational  
// ✅ Style: Use **markdown** (headings, bold, lists, tables, quotes, etc.)  
// ✅ Goal: Help student improve their CP journey with practical, topic-wise, resourceful advice.
// ✅ USE : use all below provided information and generate a very nice lenghthy, large, full guidance on how you are actually doing CP
// ✅ important : make sure to give a very detailed,large,huge section analyzing full and prepare a guidance for below student profile data and use it very carefully

// ---

// ## Student Profile:
// - Name: ${user.name || "N/A"}
// - Email: ${user.email || "N/A"}
// - Codeforces Handle: ${user.cfHandle || "N/A"}
// - Rating: ${user.codeforcesRating || "N/A"}
// - Max Rating: ${user.codeforcesMaxRating || "N/A"}
// - Rank: ${user.codeforcesRank || "N/A"}
// - Total Solved: ${user.codeforcesTotalSolved || 0}
// - Total Submissions: ${user.codeforcesTotalSubmissions || 0}
// - Accuracy: ${user.codeforcesAccuracy || 0}%
// - Last Synced: ${user.codeforcesLastSyncedAt?.toDateString() || "N/A"}

// ---

// ## Form Inputs:
// - Complaint: ${complaint || "N/A"}
// - Common Issues: ${selected?.join(", ") || "None"}
// - Daily Routine: ${routine || "Not Provided"}
// - CP Goals: ${goals || "Not Provided"}
// - Mood: ${mood || "Not Mentioned"}
// - Experience Level: ${experience || "Not Mentioned"}
// - Practice Hours Per Day: ${hoursPerDay || "Not Provided"}
// - Platform Issues: ${platformIssues || "None"}


// ---

// ## Instructions:
// Give a structured response with your **own custom headings and sections** like:

// - Challenges Faced
// - Topic-wise Suggestions (DSA, CP topics)
// - Practice Platforms
// - Sample Study Table
// - Motivation Advice
// - Focus Mistakes
// - Daily/Weekly Roadmap

// Use proper **Markdown formatting**:
// - Headings (#, ##, ###)
// - Bullet points, Numbered lists
// - Emphasis with bold, italics
// - Tables using proper markdown syntax (|...|...|)

// Avoid generic replies. Be sharp and specific.
// Do NOT write greetings or outro.
// Only give the **clean full markdown content**, ready for display.
// `;

const prompt = `
You're a **Competitive Programming (CP) Grandmaster-level coach** and strategist.

Your job is to **analyze the student's CP profile and history** and create a **personalized improvement plan**.

✅ Act like a top-tier coach — give data-backed feedback  
✅ Use advanced CP insight — focus on contest performance, topic coverage, attempt patterns  
✅ Format: Markdown (with proper headings, bold, tables, lists, quotes, etc.)  
✅ Tone: Friendly, Confident, Sharp, Mentor-like  
✅ Avoid generic DSA talk — focus on CP-style problem solving, strategy, and topic mastery

---

## 🧠 Student Profile:
- **Name:** ${user.name || "N/A"}
- **Email:** ${user.email || "N/A"}
- **Codeforces Handle:** ${user.cfHandle || "N/A"}
- **Current Rating:** ${user.codeforcesRating || 0}
- **Max Rating:** ${user.codeforcesMaxRating || 0}
- **Global Rank:** ${user.codeforcesRank || "N/A"}
- **Max Rank:** ${user.codeforcesMaxRank || "N/A"}
- **Total Problems Solved:** ${user.codeforcesTotalSolved || 0}
- **Total Submissions:** ${user.codeforcesTotalSubmissions || 0}
- **Accuracy:** ${user.codeforcesAccuracy || 0}%
- **Last Synced:** ${user.codeforcesLastSyncedAt?.toDateString() || "N/A"}
Here Accuracy means (totalAcceptedSolution/total attempts )*100
---

## 📊 Topic-Wise Stats:
${user.codeforcesTopicStats?.length > 0
  ? user.codeforcesTopicStats
      .map(({ tag, solved }) => `- **${tag}:** ${solved} problems`)
      .join("\n")
  : "No topic data available"}

---

## 📝 Student’s Self Inputs:
- **Complaint:** ${complaint || "N/A"}
- **Common Issues:** ${selected?.join(", ") || "None"}
- **Daily Routine:** ${routine || "Not Provided"}
- **CP Goals:** ${goals || "Not Provided"}
- **Mood:** ${mood || "Not Mentioned"}
- **Experience Level:** ${experience || "Not Mentioned"}
- **Practice Hours Per Day:** ${hoursPerDay || "Not Provided"}
- **Platform Issues:** ${platformIssues || "None"}

---

## 🎯 What You Must Do:

Analyze all the above data and generate a **custom CP improvement blueprint**.

Include sections such as:

### 🔥 Areas to Improve
Based on topic stats and rating, highlight weak topics (e.g., if only 1 problem solved in "DP", highlight that).

### 🧩 CP Topics to Focus Next
Tell what topics the student should now **master next**, and **how** (easy to hard). Prioritize CP topics like:
- Greedy
- DP
- Math
- Graphs
- Number Theory
- Bitmasks
- Games
- Constructive Algorithms
- VERY IMPORTANT POINT - give 4 tables(atleast 5 columns and 6 rows) for 4 types rating based of current rating(like if current rating is 1000 then give 4 tables for rating 900, 1000,1100, 1200)
  the table which will contain every cell as some techniques used to crack a problem like two-pointer,AND operation use, think from back,sorting sometimes cracks the problem, and etc... by your thinking
  also the techniques must be exact what is used(dont say to lern basic dp then advanve or any irregular), it must have exact approaches used to solve problem
  also dont repeat things very frequently (be very specific give as must tricks , techniques, approaches, clever thinking as possible)
  also just give the tables with proper main heading and dont give any type of response that i cant generate such tables or giving only 2 tables and rest will be advanced with it

### 📚 Platform + Resource Strategy
Suggest best use of Codeforces (Virtuals, Contests, Topic Tag search), AtCoder, CSES, Gym, etc.

### 📅 Study Plan (Table format)
Give a **weekly study table** (Days vs Topics/Tasks)

### 🏁 Contest Strategy
Give advice for:
- Virtual Contests
- Upsolving practice
- Speed vs Accuracy improvement
- How to avoid panic and use thinking time better

### ❌ Mistakes & Misconceptions
List any common CP traps to avoid (like brute-force bias, premature optimization)

### 💪 Motivation Advice
Give real talk — how to be consistent even when stuck at same rating or facing failure

---

AGAIN saying : ONE point mentioned above which is said to important must be given with good thinking and dont repeat things

**Important:**  
Use only markdown.  
Avoid any introduction or greeting.  
Output should start from heading (no “Hello” or “Sure here is…”).  
Keep tone strong and inspiring like a senior coder helping a junior.

Only output markdown content — no explanation about the answer.

`;




  try {
    const response = await getGeminiResponse(prompt);
    res.json(response);
  } catch (error) {
    console.error("DoctorCP Error:", error.message);
    res.status(500).json({ message: "Something went wrong in feedback." });
  }
};

export default diagnoseUser;

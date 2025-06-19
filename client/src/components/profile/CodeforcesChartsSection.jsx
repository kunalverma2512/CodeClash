import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../context/AuthContext";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

const CodeforcesChartsSection = () => {
  const { user } = useContext(AuthContext);
  if (!user) return null;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-24 space-y-16 mt-16">
      
      {/* Chart Card Template */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-full">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          Codeforces Rating Progress
        </h2>
        <div className="w-full h-[300px] min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={user.codeforcesContests}>
              <XAxis dataKey="contestName" hide />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="oldRating" stroke="#8884d8" name="Old Rating" />
              <Line type="monotone" dataKey="newRating" stroke="#82ca9d" name="New Rating" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-full">
        <h2 className="text-2xl font-bold mb-4 text-red-700">
          Submission Verdicts
        </h2>
        <div className="w-full h-[300px] min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={user.codeforcesVerdictStats}
                dataKey="count"
                nameKey="verdict"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                label
              >
                {user.codeforcesVerdictStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-full">
        <h2 className="text-2xl font-bold mb-4 text-green-700">
          Topic-wise Solved Problems
        </h2>
        <div className="w-full h-[300px] min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={user.codeforcesTopicStats}>
              <XAxis dataKey="tag" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="solved" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-full">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">
          Monthly Activity
        </h2>
        <div className="w-full h-[300px] min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={user.codeforcesMonthlyActivity}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="solved" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CodeforcesChartsSection;

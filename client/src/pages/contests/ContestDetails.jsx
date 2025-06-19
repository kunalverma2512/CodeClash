import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchContestById, fetchProblemsByIds } from "../../services/api";
import {
  CalendarDays,
  Clock,
  Tag,
  Trophy,
  FileText,
  User,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import { toast } from "react-toastify";

const ContestDetails = () => {
  const { cid } = useParams();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getContest = async () => {
      try {
        const data = await fetchContestById(cid);

        if (data.problems?.length && typeof data.problems[0] === "string") {
          const fullProblems = await fetchProblemsByIds(data.problems);
          data.problems = fullProblems;
        }

        setContest(data);
      } catch (err) {
        setError("Failed to load contest.");
        toast.error(err)
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getContest();
  }, [cid]);

  if (loading)
    return <div className="text-center mt-10 text-gray-600 text-lg">Loading...</div>;

  if (error || !contest)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  const now = Date.now();
  const start = new Date(contest.startDate).getTime();
  const end = new Date(contest.endDate).getTime();

  const isRunning = now >= start && now <= end;
  const isUpcoming = now < start;
  const isEnded = now > end;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10 font-inter">
      {/* Title */}
      <div className="space-y-2 border-b pb-6">
        <h1 className="text-4xl font-bold text-blue-800 flex items-center gap-2">
          <Trophy size={28} /> {contest.title}
        </h1>
        <p className="text-gray-700">{contest.description}</p>
      </div>

      {/* Timings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-sky-50 p-5 rounded-lg shadow">
          <h2 className="flex items-center gap-2 text-sm text-sky-800 font-semibold uppercase tracking-wide">
            <CalendarDays size={18} /> Start Time
          </h2>
          <p className="mt-1 text-gray-700">{new Date(contest.startDate).toLocaleString()}</p>
        </div>
        <div className="bg-rose-50 p-5 rounded-lg shadow">
          <h2 className="flex items-center gap-2 text-sm text-rose-800 font-semibold uppercase tracking-wide">
            <Clock size={18} /> End Time
          </h2>
          <p className="mt-1 text-gray-700">{new Date(contest.endDate).toLocaleString()}</p>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4">
        {isUpcoming && (
          <p className="text-yellow-600 font-semibold flex items-center gap-2">
            <Clock size={18} /> Contest is upcoming.
          </p>
        )}
        {isRunning && (
          <p className="text-green-600 font-semibold flex items-center gap-2">
            <BadgeCheck size={18} /> Contest is currently running!
          </p>
        )}
        {isEnded && (
          <p className="text-red-600 font-semibold flex items-center gap-2">
            <ShieldCheck size={18} /> Contest has ended.
          </p>
        )}
      </div>

      {/* Eligibility and Evaluation Mode */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-1">🎓 Eligibility</h2>
          <p className="text-gray-700 text-sm">{contest.eligibility}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-1">🧠 Evaluation Mode</h2>
          <p className="text-gray-700 text-sm">{contest.evaluationMode}</p>
        </div>
      </div>

      {/* Tags */}
      {contest.tags?.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">🏷️ Tags</h2>
          <div className="flex flex-wrap gap-2">
            {contest.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                <Tag size={14} /> #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Problems */}
      {contest.problems?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText size={20} /> Problems
          </h2>
          <div className="space-y-4">
            {contest.problems.map((problem, index) => (
              <Link
                key={problem._id}
                to={`/dashboard/contests/${contest._id}/problems/${problem._id}`}
                className="block bg-white hover:bg-gray-50 p-4 rounded-lg shadow transition border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Problem {index + 1}: {problem.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Difficulty:{" "}
                      <span className="font-medium">
                        {problem.difficulty || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Footer Details */}
      <div className="text-sm text-gray-500 border-t pt-6 mt-8 space-y-1">
        <p className="flex items-center gap-1">
          <User size={14} /> Author:{" "}
          {contest.createdBy?.name || "Unknown"} (
          {contest.createdBy?.email || "N/A"})
        </p>
        <p>Status: {contest.status}</p>
      </div>
    </div>
  );
};

export default ContestDetails;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  User,
  Mail,
  BadgeCheck,
  Activity,
  Calendar,
  Shield,
  Star,
} from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { fetchCodeforcesDetails, syncCodeforces } from "../../services/api";

const UserStatSection = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cfInfo, setcfInfo] = useState(null);
  const handle = user.cfHandle;
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncWithCodeforces = async () => {
    setIsSyncing(true);
    try {
      const res = await syncCodeforces();
      if (res) toast.success("Synced Successfully");
      else toast.error("Sync failed");

      setTimeout(() => {
        setIsSyncing(false);
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(error?.message || "Sync failed");
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    if (handle) fetchCodeforcesDetails(handle, setcfInfo, setIsLoading);
  }, [handle]);

  if (!user) {
    return <div className="text-2xl text-center mt-20">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 md:px-12 lg:px-20 py-10 bg-gray-100">
      {/* Header */}
      {}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 bg-white p-6 sm:p-10 rounded-3xl shadow-xl">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-blue-400 shadow-lg"
        />
        <div className="space-y-3 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
            <User className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            {user.name}
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 flex items-center justify-center sm:justify-start gap-2">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
            {user.email}
          </p>
          <p className="text-base sm:text-lg text-gray-600 flex items-center justify-center sm:justify-start gap-2">
            <Shield className="w-5 h-5 text-gray-500" />
            <span className="capitalize">{user.role}</span>
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-10">
        {/* Codeforces Stats */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 text-purple-700 mb-6">
            <BadgeCheck className="w-6 h-6 sm:w-8 sm:h-8" />
            Codeforces Stats
          </h2>
          <ul className="space-y-3 text-base sm:text-xl">
            <li>
              <span className="font-semibold">Handle:</span>{" "}
              {user.cfHandle || "Not linked"}
            </li>
            <li>
              <span className="font-semibold">Rating:</span>{" "}
              {isLoading ? "Loading..." : cfInfo?.rating || "N/A"}
            </li>
            <li>
              <span className="font-semibold">Max Rating:</span>{" "}
              {cfInfo?.maxRating || "N/A"}
            </li>
            <li>
              <span className="font-semibold">Rank:</span>{" "}
              {cfInfo?.rank || "N/A"}
            </li>
            <li>
              <span className="font-semibold">Max Rank:</span>{" "}
              {cfInfo?.maxRank || "N/A"}
            </li>
            <li>
              <span className="font-semibold">Accuracy:</span>{" "}
              {user.codeforcesAccuracy}%
            </li>
            <li>
              <button
                onClick={handleSyncWithCodeforces}
                disabled={isSyncing}
                className={`mt-3 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-2xl text-white transition ${
                  isSyncing
                    ? "bg-gray-300 text-gray-800 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {isSyncing ? "Syncing..." : "Sync Codeforces"}
              </button>
            </li>
          </ul>
        </div>

        {/* Platform Stats */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 text-green-700 mb-6">
            <Activity className="w-6 h-6 sm:w-8 sm:h-8" />
            Platform Stats
          </h2>
          <ul className="space-y-3 text-base sm:text-xl">
            <li>
              <span className="font-semibold">Rating:</span> {user.rating}
            </li>
            <li>
              <span className="font-semibold">Max Rating:</span>{" "}
              {user.maxRating}
            </li>
            <li>
              <span className="font-semibold">Problems Solved:</span>{" "}
              {user.totalSolved}
            </li>
            <li>
              <span className="font-semibold">Total Attempts:</span>{" "}
              {user.totalAttempts}
            </li>
            <li>
              <span className="font-semibold">Accuracy:</span> {user.accuracy}%
            </li>
          </ul>
        </div>

        {/* Streaks */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 text-red-700 mb-6">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />
            Streaks
          </h2>
          <ul className="space-y-3 text-base sm:text-xl">
            <li>
              <span className="font-semibold">Current Streak:</span>{" "}
              {user.currentStreak} days
            </li>
            <li>
              <span className="font-semibold">Max Streak:</span>{" "}
              {user.maxStreak} days
            </li>
            <li>
              <span className="font-semibold">Last Submission:</span>{" "}
              {user.lastSubmissionDate
                ? new Date(user.lastSubmissionDate).toLocaleDateString()
                : "N/A"}
            </li>
          </ul>
        </div>

        {/* Badges */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 text-yellow-600 mb-6">
            <Star className="w-6 h-6 sm:w-8 sm:h-8" />
            Badges
          </h2>
          <p className="text-base sm:text-xl text-gray-600">Coming Soon...</p>
        </div>
      </div>
    </div>
  );
};

export default UserStatSection;

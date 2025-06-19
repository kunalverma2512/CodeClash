import React from "react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import { Clock, Tag, CalendarDays } from "lucide-react";

const ContestCard = ({ contest }) => {
  const {
    title,
    description,
    startDate,
    endDate,
    _id,
    tags,
    evaluationMode,
    status, // "upcoming", "ongoing", "completed"
  } = contest;

  const now = dayjs();
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  // Ensure liveStatus consistency
  let liveStatus = status;
  if (now.isBefore(start)) liveStatus = "upcoming";
  else if (now.isAfter(start) && now.isBefore(end)) liveStatus = "ongoing";
  else if (now.isAfter(end)) liveStatus = "completed";

  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-yellow-100 text-yellow-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.04, boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)" }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm cursor-pointer flex flex-col justify-between h-full"
      title={description}
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 truncate">
          {title}
        </h2>

        <span
          className={`inline-block px-4 py-1 rounded-full font-semibold text-sm tracking-wide ${getStatusBadge(
            liveStatus
          )}`}
        >
          {liveStatus.charAt(0).toUpperCase() + liveStatus.slice(1)}
        </span>

        <div className="mt-4 space-y-1 text-gray-600 dark:text-gray-400 text-sm font-medium">
          <p className="flex items-center gap-1">
            <CalendarDays size={16} />
            <span>
              <strong>Start:</strong> {start.format("DD MMM YYYY, HH:mm")}
            </span>
          </p>
          <p className="flex items-center gap-1">
            <CalendarDays size={16} />
            <span>
              <strong>End:</strong> {end.format("DD MMM YYYY, HH:mm")}
            </span>
          </p>
        </div>

        <p className="mt-4 text-gray-700 dark:text-gray-300 text-base leading-relaxed line-clamp-4">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold"
              >
                <Tag size={14} />
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {liveStatus === "upcoming" && (
        <div className="mt-6 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-lg">
          <Clock size={20} />
          <CountdownTimer startTime={startDate} />
        </div>
      )}

      <Link to={`/dashboard/contests/${_id}`}>
        <button
          type="button"
          className={`mt-6 w-full rounded-lg py-3 font-semibold text-white transition-colors duration-300 ${
            liveStatus === "ongoing"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {liveStatus === "ongoing" ? "Enter Contest" : "View Details"}
        </button>
      </Link>
    </motion.div>
  );
};

export default ContestCard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CheckCircle2, User, Globe, Star, Clock, MapPin } from "lucide-react";

const CFAccountDetailsTextOnly = ({ handle }) => {
  const [cfData, setCfData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCFInfo = async () => {
      try {
        const res = await axios.get(
          `https://codeforces.com/api/user.info?handles=${handle}`
        );
        setCfData(res.data.result[0]);
      } catch {
        console.error("Failed to fetch CF profile");
        toast.error("Failed to fetch Codeforces profile info.");
      } finally {
        setLoading(false);
      }
    };

    fetchCFInfo();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-xl sm:text-2xl lg:text-3xl font-semibold">
        Loading Codeforces profile...
      </div>
    );
  }

  if (!cfData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-red-600 dark:text-red-400 text-xl sm:text-2xl lg:text-3xl font-semibold">
        Unable to load Codeforces profile data.
      </div>
    );
  }

  const lastOnline = new Date(cfData.lastOnlineTimeSeconds * 1000).toLocaleString();
  const registrationDate = new Date(cfData.registrationTimeSeconds * 1000).toLocaleDateString();

  return (
    <section className="min-h-screen w-full px-4 sm:px-10 py-16 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col justify-center">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10 sm:mb-12">
        <CheckCircle2
          className="text-indigo-600 dark:text-indigo-400"
          size={40}
        />
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-indigo-700 dark:text-indigo-400">
          Connected with Codeforces handle
        </h1>
      </div>

      {/* Handle */}
      <div className="flex items-center gap-4 sm:gap-5 mb-10 sm:mb-14 flex-wrap">
        <User className="text-indigo-700 dark:text-indigo-400" size={36} />
        <span className="text-3xl sm:text-5xl lg:text-6xl font-bold break-all">{cfData.handle}</span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 sm:gap-y-12 gap-x-10 sm:gap-x-20 text-xl sm:text-2xl lg:text-3xl font-semibold">
        {/* Rank */}
        <div className="flex items-start gap-3 sm:gap-4">
          <Star size={36} className="text-yellow-500 mt-1" />
          <span>
            {cfData.rank ? (
              <>
                <span className="capitalize">{cfData.rank}</span> &mdash;{" "}
                <span className="text-indigo-600 dark:text-indigo-300">{cfData.rating}</span> rating
              </>
            ) : (
              "Unrated"
            )}
          </span>
        </div>

        {/* Country */}
        <div className="flex items-start gap-3 sm:gap-4">
          <Globe size={36} className="text-green-600 mt-1" />
          <span>{cfData.country ?? "Country not specified"}</span>
        </div>

        {/* Organization */}
        <div className="flex items-start gap-3 sm:gap-4">
          <MapPin size={36} className="text-purple-600 mt-1" />
          <span>{cfData.organization ?? "No organization specified"}</span>
        </div>

        {/* Last Online */}
        <div className="flex items-start gap-3 sm:gap-4">
          <Clock size={36} className="text-indigo-500 mt-1" />
          <span>Last online: {lastOnline}</span>
        </div>

        {/* Registration Date */}
        <div className="flex items-start gap-3 sm:gap-4">
          <Clock size={36} className="text-pink-500 mt-1" />
          <span>Joined on: {registrationDate}</span>
        </div>

        {/* Max Rating */}
        <div className="flex items-start gap-3 sm:gap-4">
          <Star size={36} className="text-yellow-400 mt-1" />
          <span>
            Max rating:{" "}
            <span className="text-indigo-600 dark:text-indigo-300">
              {cfData.maxRating ?? "N/A"}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default CFAccountDetailsTextOnly;

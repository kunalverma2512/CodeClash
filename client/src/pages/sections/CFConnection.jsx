import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import CFVerificationPopup from "../../components/codeForces/CFVerificationPopup";
import { AuthContext } from "../../context/AuthContext";
import CFAccountDetails from "./CFAccountDetails";
import { codeforcesVerifyHandle, linkCodeforcesHandlePopup } from "../../services/api";
    
const CFConnectSection = () => {
  const { user } = useContext(AuthContext);
  const [cfHandle, setCfHandle] = useState("");
  const [linked, setLinked] = useState(user?.cfHandle || "");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleLink = async () => {
    if (!cfHandle.trim()) return;
    setLoading(true);
    setStatus(null);
    linkCodeforcesHandlePopup(cfHandle, setVerificationCode, setPopupVisible, setCfHandle, setLoading, setStatus);
  };

  const handleVerify = async () => {
    codeforcesVerifyHandle(cfHandle,setCfHandle, setLinked, setPopupVisible, setStatus);
  };

  if (user.cfHandle) {
    return <CFAccountDetails handle={user.cfHandle} />;
  }

  return (
    <section className="relative overflow-hidden min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white dark:from-gray-900 dark:to-gray-800 px-4 sm:px-8 py-20 sm:py-28">
      {/* Background Blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3, y: [-100, 100], x: [0, -50] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-indigo-400 blur-[180px] rounded-full"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3, y: [50, -50], x: [100, -100] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
        className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-purple-500 blur-[160px] rounded-full"
      />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl w-full text-center z-10"
      >
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-extrabold text-indigo-800 dark:text-white mb-6 leading-tight text-balance">
          Connect Your Codeforces Handle
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 px-2 sm:px-10 md:px-20 text-balance">
          Sync your Codeforces account to track your problems, save notes, and
          see your rating right on your dashboard.
        </p>

        {linked ? (
          <p className="text-xl sm:text-2xl text-green-600 dark:text-green-400 font-semibold">
            ✅ Connected as <span className="underline">{linked}</span>
          </p>
        ) : (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 sm:px-0">
            <input
              type="text"
              placeholder="Enter Codeforces handle"
              value={cfHandle}
              onChange={(e) => setCfHandle(e.target.value)}
              className="px-5 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-96 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-indigo-400"
            />
            <button
              onClick={handleLink}
              disabled={loading}
              className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-xl bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 w-full sm:w-auto"
            >
              {loading ? "Linking..." : "Link"}
            </button>
          </div>
        )}

        {status === "success" && (
          <p className="text-green-600 dark:text-green-400 text-lg sm:text-xl mt-6">
            🎉 Handle linked successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 dark:text-red-400 text-lg sm:text-xl mt-6">
            ❌ Failed to link handle. Please try again.
          </p>
        )}
      </motion.div>

      {popupVisible && (
        <CFVerificationPopup
          handle={cfHandle}
          code={verificationCode}
          onClose={() => setPopupVisible(false)}
          onVerify={handleVerify}
        />
      )}
    </section>
  );
};

export default CFConnectSection;

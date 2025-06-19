import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import aidoc from "../../assets/ai-doc.jpeg";
import aidoc2 from "../../assets/ai-doc2.jpeg"
import aidoc3 from "../../assets/ai-doc3.jpeg"
import { DoctorsubmitDiagnosis } from "../../services/api";

export default function DoctorForm({ setReport }) {
  const [complaint, setComplaint] = useState("");
  const [checkboxes, setCheckboxes] = useState({
    stuckRating: false,
    fearOfTopics: false,
    timePressure: false,
    rageQuit: false,
  });

  const [routine, setRoutine] = useState("");
  const [goals, setGoals] = useState("");
  const [mood, setMood] = useState("");
  const [experience, setExperience] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");
  const [platformIssues, setPlatformIssues] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitDiagnosis = async () => {
    if (!complaint && !Object.values(checkboxes).some(Boolean)) {
      toast.error("Please enter your complaint or select an issue.");
      return;
    }

    setLoading(true);
    DoctorsubmitDiagnosis(
      complaint,
      checkboxes,
      routine,
      goals,
      mood,
      experience,
      hoursPerDay,
      platformIssues,
      setReport,
    )
    setLoading(false);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-12 py-10 bg-gradient-to-br from-blue-100 via-white to-blue-50 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-12 text-gray-800">
      
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:max-w-2xl space-y-8"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-700 tracking-tight">
          👨‍⚕️ Doctor CP
        </h1>

        <p className="text-xl sm:text-2xl text-gray-600">
          Tell me your CP struggles. I’ll diagnose and prescribe your cure 💊
        </p>

        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Describe your Competitive Programming pains..."
          rows="6"
          className="w-full text-lg sm:text-xl border border-blue-200 rounded-2xl p-4 sm:p-6 bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-lg sm:text-xl">
          <Checkbox label="Stuck at same rating" name="stuckRating" />
          <Checkbox label="Fear of new topics" name="fearOfTopics" />
          <Checkbox label="Time pressure in contests" name="timePressure" />
          <Checkbox label="Rage quit on wrong answers" name="rageQuit" />
        </div>

        <textarea
          value={routine}
          onChange={(e) => setRoutine(e.target.value)}
          placeholder="Your daily CP routine (optional)..."
          rows="4"
          className="w-full mt-6 text-lg sm:text-xl border border-blue-200 rounded-2xl p-4 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <textarea
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          placeholder="Your goals in CP (optional)..."
          rows="3"
          className="w-full text-lg sm:text-xl border border-blue-200 rounded-2xl p-4 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-lg sm:text-xl mt-4">
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full border border-blue-200 p-3 rounded-xl shadow bg-white"
          >
            <option value="">How are you feeling? (optional)</option>
            <option value="Calm">Calm</option>
            <option value="Stressed">Stressed</option>
            <option value="Burned Out">Burned Out</option>
            <option value="Motivated">Motivated</option>
          </select>

          <div className="flex flex-col w-full">
            <label className="mb-1 text-gray-600">Experience Level</label>
            <div className="flex gap-4 sm:gap-6 items-center flex-wrap">
              {["Beginner", "Intermediate", "Advance"].map((level) => (
                <label key={level} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={level}
                    checked={experience === level}
                    onChange={() => setExperience(level)}
                    className="accent-blue-600"
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4 text-lg sm:text-xl">
          <input
            type="number"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value)}
            placeholder="Hours per day in CP"
            min="0"
            max="12"
            className="w-full border border-blue-200 p-3 rounded-xl shadow bg-white"
          />

          <input
            type="text"
            value={platformIssues}
            onChange={(e) => setPlatformIssues(e.target.value)}
            placeholder="Any platform-specific struggle?"
            className="w-full border border-blue-200 p-3 rounded-xl shadow bg-white"
          />
        </div>

        <button
          onClick={submitDiagnosis}
          disabled={loading}
          className="w-full text-lg sm:text-xl font-semibold bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition duration-300 mt-6"
        >
          {loading ? "🩺 Diagnosing..." : "🧠 Get Diagnosis"}
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 backdrop-blur-md border border-blue-200 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 mt-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-800">📋 Diagnosis Report</h2>
            <p className="text-lg sm:text-xl text-gray-800 whitespace-pre-line">{result.diagnosis}</p>

            <h3 className="text-2xl sm:text-3xl font-semibold text-green-700 mt-6">💊 Prescription</h3>
            <p className="text-lg sm:text-xl text-gray-800 whitespace-pre-line">{result.prescription}</p>

            {result.links?.length > 0 && (
              <div className="mt-4">
                <p className="text-lg sm:text-xl text-gray-700 font-medium">🔗 Helpful Links:</p>
                <ul className="list-disc ml-6 space-y-2">
                  {result.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Right Visual Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:max-w-md flex flex-col items-center justify-center bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-blue-200"
      >
        {[aidoc, aidoc2, aidoc3].map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Doctor CP"
            className="w-64 h-64 sm:w-72 sm:h-72 object-cover rounded-2xl shadow-md mb-6"
          />
        ))}
        <blockquote className="italic text-gray-700 text-lg sm:text-xl text-center">
          "Diagnose your bugs, not your brain."
        </blockquote>
        <p className="mt-2 text-blue-500 text-base sm:text-lg">– Doctor CP</p>
      </motion.div>
    </div>
  );

  function Checkbox({ label, name }) {
    return (
      <label className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={checkboxes[name]}
          onChange={() =>
            setCheckboxes((prev) => ({ ...prev, [name]: !prev[name] }))
          }
          className="h-5 w-5 accent-blue-600"
        />
        <span className="text-gray-700">{label}</span>
      </label>
    );
  }
}


import React from "react";
import ReactMarkdown from "react-markdown";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Timer,
  Gauge,
  Trophy,
  Tag,
  FileCode,
  List,
  BookText,
} from "lucide-react";

const ProblemDetails = ({ problem }) => {
  const difficultyColor = {
    Easy: "bg-emerald-100 text-emerald-600",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-rose-100 text-rose-700",
  };

  const publicTestcases = problem.testcases?.filter((tc) => tc.isPublic);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-6 py-12 space-y-14 font-inter"
    >
      {/* Title + Metadata */}
      <section className="space-y-4 border-b border-gray-300 dark:border-gray-700 pb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {problem.title}
        </h1>

        <div className="flex flex-wrap gap-3 text-sm font-medium">
          <span
            className={`flex items-center gap-1 px-3 py-1 rounded-full shadow-sm ${difficultyColor[problem.difficulty]}`}
          >
            <BadgeCheck size={16} /> {problem.difficulty}
          </span>
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-sky-100 text-sky-800 shadow-sm">
            <Trophy size={16} /> Max Score: {problem.maxScore}
          </span>
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 text-orange-700 shadow-sm">
            <Timer size={16} /> Time: {problem.timeLimit}ms
          </span>
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-700 shadow-sm">
            <Gauge size={16} /> Memory: {problem.memoryLimit}MB
          </span>
        </div>

        {/* Tags */}
        {problem.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {problem.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-zinc-200 text-zinc-800 px-3 py-1 rounded-full flex items-center gap-1"
              >
                <Tag size={14} /> #{tag}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Statement */}
      <section>
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800 dark:text-white mb-4">
          <BookText size={20} /> Problem Statement
        </h2>
        <div className="prose max-w-none text-gray-800 dark:text-gray-300 dark:prose-invert prose-pre:bg-gray-900 prose-pre:text-white">
          <ReactMarkdown>{problem.statement}</ReactMarkdown>
        </div>
      </section>

      {/* Examples */}
      {problem.examples?.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800 dark:text-white mb-4">
            <List size={20} /> Examples
          </h2>
          <div className="space-y-6">
            {problem.examples.map((ex, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-md space-y-3"
              >
                <div>
                  <strong className="text-gray-700 dark:text-gray-200">
                    Input:
                  </strong>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md text-sm whitespace-pre-wrap overflow-x-auto">
                    {ex.input}
                  </pre>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-200">
                    Output:
                  </strong>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md text-sm whitespace-pre-wrap overflow-x-auto">
                    {ex.output}
                  </pre>
                </div>
                {ex.explanation && (
                  <div>
                    <strong className="text-gray-700 dark:text-gray-200">
                      Explanation:
                    </strong>
                    <div className="text-sm p-3 bg-gray-50 dark:bg-gray-900 rounded-md mt-1">
                      {ex.explanation}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testcases */}
      {publicTestcases?.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800 dark:text-white mb-4">
            <FileCode size={20} /> Public Testcases
          </h2>
          <div className="space-y-5">
            {publicTestcases.map((tc, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md space-y-3"
              >
                <div>
                  <strong className="text-gray-700 dark:text-gray-200">
                    Input:
                  </strong>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm whitespace-pre-wrap overflow-x-auto">
                    {tc.input}
                  </pre>
                </div>
                <div>
                  <strong className="text-gray-700 dark:text-gray-200">
                    Expected Output:
                  </strong>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm whitespace-pre-wrap overflow-x-auto">
                    {tc.expectedOutput}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
};

export default ProblemDetails;

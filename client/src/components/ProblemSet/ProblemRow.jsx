import { useState } from "react";

const ProblemRow = ({ problem }) => {
  const [isSolved, setIsSolved] = useState(false);

  return (
    <div className="grid grid-cols-5 items-center gap-4 bg-white shadow-sm rounded-lg px-4 py-3 mb-3 hover:shadow-md transition-all duration-200 border border-gray-200">
      {/* Index */}
      <span className="text-gray-500">{problem.index}</span>

      {/* Title */}
      <a
        href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline font-medium"
      >
        {problem.name}
      </a>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {(problem.tags || []).map((tag, idx) => (
          <span
            key={idx}
            className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Notes Button */}
      <button
        className="px-3 py-1 bg-pink-100 text-pink-700 text-sm font-semibold rounded-md hover:bg-pink-200 transition"
        onClick={() => alert("Future WYSIWYG notes editor popup")}
      >
        Add Notes
      </button>

      {/* Solved Checkbox */}
      <input
        type="checkbox"
        checked={isSolved}
        onChange={() => setIsSolved(!isSolved)}
        className="h-5 w-5 text-green-600 rounded focus:ring-green-500"
      />
    </div>
  );
};

export default ProblemRow;

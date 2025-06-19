import React from "react";

const ProblemCard = ({ problem }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-lg font-semibold">
        <a
          href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {problem.name}
        </a>
      </h3>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Contest: </span>
        {`#${problem.contestId} - Problem  ${problem.index}`}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Difficulty: </span>{problem.difficulty}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Tags: </span>{problem.tags.join(", ")}
      </p>
    </div>
  );
};

export default ProblemCard;

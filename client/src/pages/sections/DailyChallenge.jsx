import React, { useState } from "react";

const DailyChallenge = () => {
  // Sample problem data (This could be dynamic, pulled from an API or database)
  const [randomProblem, setRandomProblem] = useState({
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    description:
      "Given an unsorted array of integers, find the length of the longest increasing subsequence.",
  });

  // Function to simulate fetching a random problem (can be extended with an API)
  const fetchRandomProblem = () => {
    const problems = [
      {
        title: "Longest Increasing Subsequence",
        difficulty: "Medium",
        description:
          "Given an unsorted array of integers, find the length of the longest increasing subsequence.",
      },
      {
        title: "Knapsack Problem",
        difficulty: "Hard",
        description:
          "Given a set of items, each with a weight and a value, determine the maximum value that can be carried in a knapsack of a given capacity.",
      },
      {
        title: "Binary Search",
        difficulty: "Easy",
        description:
          "Implement binary search to find the target value in a sorted array.",
      },
    ];
    const randomIndex = Math.floor(Math.random() * problems.length);
    setRandomProblem(problems[randomIndex]);
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50 py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Daily Challenge / Random Problem
        </h2>

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
          <h3 className="text-2xl font-semibold text-teal-600 mb-4">
            {randomProblem.title}
          </h3>
          <p className="text-lg text-gray-700 mb-4">{randomProblem.description}</p>
          <p className="text-md text-gray-500 mb-6">Difficulty: {randomProblem.difficulty}</p>
          
          {/* Button to simulate fetching a new random problem */}
          <div className="flex items-center justify-between">
            <button
              onClick={fetchRandomProblem}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition duration-300"
            >
              Want Another 
            </button>
            <span className="text-sm text-gray-500">New problem every day!</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyChallenge;

import React from "react";

const PracticeSuggestions = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 flex items-center justify-center py-0">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 w-full flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Practice Suggestions / Problem Sets
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {/* Problem Set 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 flex flex-col justify-between h-full">
            <h3 className="text-xl font-semibold text-teal-600 mb-3">Dynamic Programming Problems</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Challenge yourself with a set of DP problems ranging from beginner to advanced levels.
            </p>
            <a href="/practice/dp-problems" className="text-teal-600 font-medium mt-auto">
              Start Practicing → 
            </a>
          </div>

          {/* Problem Set 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 flex flex-col justify-between h-full">
            <h3 className="text-xl font-semibold text-orange-600 mb-3">Graphs: Easy Set for Revision</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              A collection of simple graph problems, perfect for revising the fundamental concepts.
            </p>
            <a href="/practice/graphs" className="text-orange-600 font-medium mt-auto">
              Start Practicing → 
            </a>
          </div>

          {/* Problem Set 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 flex flex-col justify-between h-full">
            <h3 className="text-xl font-semibold text-purple-600 mb-3">Binary Search Mastery</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Enhance your skills with a variety of binary search-based problems, tailored for all levels.
            </p>
            <a href="/practice/binary-search" className="text-purple-600 font-medium mt-auto">
              Start Practicing → 
            </a>
          </div>

          {/* Problem Set 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 flex flex-col justify-between h-full">
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">Greedy Algorithms Practice</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Dive into problems where greedy algorithms shine, with solutions to understand the approach.
            </p>
            <a href="/practice/greedy-algorithms" className="text-indigo-600 font-medium mt-auto">
              Start Practicing → 
            </a>
          </div>

          {/* Problem Set 5 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 flex flex-col justify-between h-full">
            <h3 className="text-xl font-semibold text-teal-600 mb-3">Segment Trees: Learn & Practice</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Master segment trees with various problems, from range queries to dynamic updates.
            </p>
            <a href="/practice/segment-trees" className="text-teal-600 font-medium mt-auto">
              Start Practicing → 
            </a>
          </div>

          {/* Problem Set 6 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 flex flex-col justify-between h-full">
            <h3 className="text-xl font-semibold text-orange-600 mb-3">Depth-First Search (DFS)</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Solve DFS problems to deepen your understanding of traversal and backtracking techniques.
            </p>
            <a href="/practice/dfs" className="text-orange-600 font-medium mt-auto">
              Start Practicing → 
            </a>
          </div>

          {/* Problem Set 7 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 flex flex-col justify-between h-full">
            <h3 className="text-xl font-semibold text-purple-600 mb-3">Breadth-First Search (BFS)</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Explore BFS problems and strengthen your problem-solving skills on shortest paths and more.
            </p>
            <a href="/practice/bfs" className="text-purple-600 font-medium mt-auto">
              Start Practicing → 
            </a>
          </div>

          {/* Problem Set 8 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 flex flex-col justify-between h-full">
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">Backtracking Problems</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Practice backtracking through problems like N-Queens, Sudoku Solver, and more.
            </p>
            <a href="/practice/backtracking" className="text-indigo-600 font-medium mt-auto">
              Start Practicing → 
            </a>
          </div>

          {/* Problem Set 9 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 flex flex-col justify-between h-full">
            <h3 className="text-xl font-semibold text-teal-600 mb-3">Sorting Algorithms Practice</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Solve problems involving sorting algorithms like quicksort, mergesort, and more.
            </p>
            <a href="/practice/sorting-algorithms" className="text-teal-600 font-medium mt-auto">
              Start Practicing → 
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PracticeSuggestions;

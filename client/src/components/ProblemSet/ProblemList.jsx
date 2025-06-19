import React, { useState } from "react";
import AddNotes from "./AddNotesModal";
import AddNotesModal from "./AddNotesModal";

const ProblemList = ({ problems }) => {

  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);




  const handleAddNotes = (problem) => {
    setSelectedProblem(problem);
    setOpenNoteModal(true);
  };

  return (
    <div className="mx-auto mt-10 max-w-7xl px-6 py-6 bg-white dark:bg-gray-900 shadow-2xl rounded-3xl border border-gray-300 dark:border-gray-700">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
        📘 Problem Archive
      </h2>
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full text-sm text-gray-800 dark:text-gray-200">
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase font-semibold text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left rounded-tl-xl">Problem Name</th>
              <th className="px-6 py-4 text-left">Tags</th>
              <th className="px-6 py-4 text-center">Solved?</th>
              <th className="px-6 py-4 text-center rounded-tr-xl">Add Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {problems.map((problem, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
              >
                <td className="px-6 py-4 font-semibold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                  <a
                    href={`https://codeforces.com/contest/${problem.contestId}/problem/${problem.name[0]}`}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {problem.name}
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {problem.tags.join(", ")}
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={()=> handleAddNotes(problem)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-indigo-700 transition duration-150"
                  >
                    Add Notes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddNotesModal
        isOpen={openNoteModal}
        onClose={() => setOpenNoteModal(false)}
        problem={selectedProblem}
        // userId={userId}
      />
      
    </div>
  );
};

export default ProblemList;

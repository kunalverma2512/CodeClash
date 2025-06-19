import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Previous
      </button>
      <span className="text-lg">{`${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

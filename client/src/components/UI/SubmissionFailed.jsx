import React from "react";

const SubmissionFailed = ({ message }) => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-[#f5f8f8b0] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-bold text-red-600 mb-2">Submission Failed</h2>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={handleRetry}
            className="bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionFailed;

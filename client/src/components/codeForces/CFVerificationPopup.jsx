import React from "react";

const CFVerificationPopup = ({ onClose, code, handle, onVerify }) => {
  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl max-w-xl w-full">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">
          Verify Ownership
        </h2>
        <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
          To confirm that <strong>{handle}</strong> is your Codeforces handle, please go to your profile and temporarily paste the following code into your{" "}
          <strong>Last Name</strong> field:
        </p>
        <div className="bg-gray-100 dark:bg-gray-700 text-center text-lg font-mono p-4 rounded-lg mb-6 select-all">
          {code}
        </div>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          After saving the change on Codeforces, click the verify button below. You can remove the code from your profile once verified.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-white hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={onVerify}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default CFVerificationPopup;

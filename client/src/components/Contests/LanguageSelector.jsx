import React from "react";

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        💻 Select Language
      </label>
      <div className="relative">
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="block w-full px-4 py-2 pr-10 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          ▼
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;

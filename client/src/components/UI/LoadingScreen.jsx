import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-center z-50">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-transparent border-purple-600 rounded-full animate-spin mb-6"></div>
      
      {/* Loading Text */}
      <p className="text-lg font-semibold text-gray-700 animate-pulse">Loading, please wait...</p>
    </div>
  );
};

export default LoadingScreen;

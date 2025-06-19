import React from "react";

const CodeClashLoader = () => {
  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col items-center justify-center z-50">
      <h1
        className="text-gray-800 font-serif select-none mb-8"
        style={{
          letterSpacing: "0.15em",
          fontWeight: 600,
        //   fontFamily: "Georgia, serif",
          fontSize: "9rem",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        Code 
        <span  className="text-red-500">Clash</span>
      </h1>

      {/* Spinner */}
      <svg
        className="animate-spin text-gray-600 mb-8"
        style={{ width: "4rem", height: "4rem" }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>

      <p
        className="text-gray-700 font-serif select-none"
        style={{ fontSize: "1.25rem", letterSpacing: "0.1em" }}
      >
        Competitive Programming Platform
      </p>
    </div>
  );
};

export default CodeClashLoader;

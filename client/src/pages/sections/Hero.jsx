import React from "react";
import { googleLogin } from "../../services/api";

const Hero = () => {
  const handleGetStarted = () => {
    googleLogin();
  };
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="w-full max-w-screen-xl px-6 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
          CodeClash: Your Competitive Edge in Programming
        </h1>

        <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          Master data structures and algorithms, compete in timed contests, and
          get AI-driven performance insights — all in one unified platform.
          Whether you're a beginner or a pro, CodeClash helps you grow smarter.
        </p>

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center px-6 py-3 text-white text-base font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition"
          >
            Get Started
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

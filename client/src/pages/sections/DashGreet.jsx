import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const DashGreet = () => {
  return (
    <section className="relative min-h-screen w-full bg-gradient-to-br from-[#fefefe] to-[#eef1ff] dark:from-gray-900 dark:to-gray-800 overflow-hidden px-6 sm:px-12 py-20 flex items-center">
      
      
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-300 dark:bg-purple-800 opacity-20 blur-[160px] rounded-full z-0"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-indigo-400 dark:bg-indigo-700 opacity-20 blur-[160px] rounded-full z-0"></div>

      <motion.div
        className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {/* Left Section - Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            <Typewriter
              options={{
                strings: [
                  "Your Coding Arena — Solve. Learn. Rise.",
                  "Level Up Your Coding Game",
                  "Where Logic Meets Challenge",
                  "Your Competitive Coding Command Center",
                  "Sharpen Skills. Solve Daily. Win Consistently.",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 40,
              }}
            />
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto lg:mx-0">
            Practice hand-picked coding problems, participate in contests, view your progress heatmaps, and master algorithms with personalized feedback. This is your ultimate CP dashboard — fast, focused, and feature-rich.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="/problemset"
              className="px-6 py-3 text-lg font-semibold bg-indigo-600 text-white rounded-xl shadow-md hover:shadow-xl hover:bg-indigo-700 transition duration-300"
            >
              🧠 Practice Problems
            </a>
            <a
              href="/dashboard/contests"
              className="px-6 py-3 text-lg font-semibold border-2 border-gray-800 dark:border-white text-gray-900 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
            >
              🏁 Join Contest
            </a>
          </div>
        </motion.div>

        {/* Right Section - Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hidden lg:block"
        >
          <img
            src="https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Coding illustration"
            className="w-full max-w-[550px] rounded-3xl shadow-2xl border border-indigo-200 dark:border-indigo-800"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DashGreet;

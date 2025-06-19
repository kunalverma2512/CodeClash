import React from "react";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-tr from-pink-600 via-purple-700 to-indigo-800 flex items-center justify-center px-8 overflow-x-hidden">

      {/* Decorative blurred shapes background */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-pink-400 rounded-full filter blur-3xl opacity-40"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-indigo-400 rounded-full filter blur-3xl opacity-40"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative max-w-4xl text-center lg:text-left text-white"
      >
        <h1 className="text-7xl font-extrabold mb-8 leading-tight drop-shadow-lg">
          Ready to Become a Coding Legend?
        </h1>
        <p className="text-2xl mb-12 max-w-xl opacity-90">
          Join thousands of coders mastering algorithms, crushing contests, and leveling up their careers every day.
        </p>
        <div className="flex justify-center lg:justify-start gap-6">
          <a
            href="/signup"
            className="px-12 py-4 bg-white text-indigo-900 font-bold rounded-full text-2xl shadow-lg hover:bg-gray-200 transition"
          >
            Get Started
          </a>
          <a
            href="/learn-more"
            className="px-12 py-4 border-2 border-white rounded-full text-white font-semibold text-2xl hover:bg-white hover:text-indigo-900 transition"
          >
            Learn More
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;

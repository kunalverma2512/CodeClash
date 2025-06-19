import React from "react";
import { motion } from "framer-motion";

const QuoteSection = () => {
  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[90vh] lg:min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-800 to-pink-700 overflow-hidden px-4 sm:px-8 lg:px-16 py-16 sm:py-24">
      {/* Animated overlay */}
      <motion.div
        className="absolute inset-0 bg-black opacity-20"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      <motion.blockquote
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative max-w-6xl text-center text-white select-none px-4"
      >
        <p className="text-[clamp(2rem,6vw,5rem)] font-extrabold leading-tight mb-8 drop-shadow-2xl">
          “Programs must be written for people to read, and only incidentally for machines to execute.”
        </p>
        <footer className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold drop-shadow-lg mt-4">
          — Harold Abelson
        </footer>
      </motion.blockquote>
    </section>
  );
};

export default QuoteSection;

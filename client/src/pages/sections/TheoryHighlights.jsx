import React from "react";
import { motion } from "framer-motion";

const blogs = [
  {
    title: "Understanding Time & Space Complexity",
    excerpt:
      "A beginner-friendly guide to analyzing the efficiency of algorithms using Big-O notation with real-world analogies.",
    author: "Shaswaqt",
    date: "May 2, 2025",
  },
  {
    title: "Greedy vs Dynamic Programming",
    excerpt:
      "Learn when to apply greedy methods and when to use DP through problem patterns and step-by-step comparisons.",
    author: "Yukthika",
    date: "April 25, 2025",
  },
  {
    title: "Mastering Graph Algorithms",
    excerpt:
      "From BFS and DFS to Dijkstra and Kruskal, explore the essential graph algorithms with intuitive visual explanations.",
    author: "Abhirup",
    date: "April 20, 2025",
  },
  {
    title: "Recursion Simplified",
    excerpt:
      "Break the fear of recursion with tree diagrams, tracing techniques, and base-case mastery.",
    author: "Kunal",
    date: "April 14, 2025",
  },
];

// Animation variants
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const backgroundBlobVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.15, transition: { duration: 2, ease: "easeInOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const TheoryHighlights = () => {
  return (
    <section className="relative min-h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-hidden px-8 py-16 flex flex-col justify-center">
      {/* Background blobs */}
      <motion.div
        className="absolute top-[-180px] left-[-180px] w-[400px] h-[400px] bg-indigo-400 dark:bg-indigo-700 rounded-full filter blur-[180px] z-0"
        initial="hidden"
        animate="visible"
        variants={backgroundBlobVariants}
      />
      <motion.div
        className="absolute bottom-[-160px] right-[-160px] w-[500px] h-[500px] bg-purple-300 dark:bg-purple-800 rounded-full filter blur-[180px] z-0"
        initial="hidden"
        animate="visible"
        variants={backgroundBlobVariants}
        transition={{ delay: 1 }}
      />

      <motion.div
        className="relative z-10 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 dark:text-gray-200 mb-14"
          variants={itemVariants}
        >
          Theory Blog Highlights
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1200px] mx-auto px-4">
          {blogs.map((blog, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
            >
              <h3 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-400 mb-4">
                {blog.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-base mb-6 leading-relaxed">
                {blog.excerpt}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                By <span className="font-medium">{blog.author}</span> • {blog.date}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TheoryHighlights;

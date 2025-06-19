import React from "react";
import { motion } from "framer-motion";
import { Code, Trophy, Users, BarChart3, Clock, Brain } from "lucide-react";

const features = [
  {
    title: "Daily Coding Challenges",
    icon: Clock,
    description: "Sharpen your problem-solving with fresh, curated challenges every day.",
  },
  {
    title: "Topic-wise Practice",
    icon: Brain,
    description: "Master DSA concepts with focused, topic-based problem sets.",
  },
  {
    title: "Contests & Leaderboards",
    icon: Trophy,
    description: "Climb the ranks by participating in exciting coding contests.",
  },
  {
    title: "Progress Tracking",
    icon: BarChart3,
    description: "View your stats, history, and improvement in rich visual formats.",
  },
  {
    title: "Community & Discussions",
    icon: Users,
    description: "Ask doubts, share knowledge, and grow together with peers.",
  },
  {
    title: "Smart Code Editor",
    icon: Code,
    description: "Write, compile, and test code live with custom testcases.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

const FeatureShowcase = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden py-24 px-6 sm:px-12 lg:px-20 bg-gradient-to-br from-[#f4f4fc] via-[#f0f2ff] to-[#e6ecfd] dark:from-gray-900 dark:to-gray-800">
      {/* Background Decorative Blur */}
      <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-indigo-500 opacity-20 blur-[160px] z-0" />
      <div className="absolute bottom-[-150px] left-[-150px] w-[400px] h-[400px] rounded-full bg-purple-400 opacity-20 blur-[160px] z-0" />

      <motion.div
        className="relative max-w-7xl mx-auto z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.div variants={cardVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            🚀 Explore the Power of Our Platform
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From daily challenges to live contests, everything you need to level up your coding journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-gray-300 dark:border-gray-700 hover:scale-[1.02] hover:shadow-indigo-500/30 transition duration-300"
            >
              <div className="mb-5 p-3 inline-flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800/30">
                <feature.icon className="w-10 h-10 text-indigo-600 dark:text-indigo-300" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeatureShowcase;

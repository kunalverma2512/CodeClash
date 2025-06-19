import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContestCard from "../../components/Contests/ContestCard";
import LoadingScreen from "../../components/UI/LoadingScreen";
import { fetchContests } from "../../services/api";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.15,
      when: "beforeChildren"
    } 
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } }
};
  
const ContestsList = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetchContests(setContests, setLoading);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 px-6 py-8">
      <h1 className="text-5xl font-extrabold mb-10 text-center text-gray-900 dark:text-white tracking-tight select-none">
        CodeClash Contests
      </h1>

      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {contests.length > 0 ? (
            contests.map((contest) => (
              <motion.div key={contest._id} variants={cardVariants} layout>
                <ContestCard contest={contest} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 dark:text-gray-400 text-xl">
              No contests available.
            </p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ContestsList;

import { Lightbulb, Users, MessageCircleHeart, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const ForumFeatureSection = () => {
  return (
    <section className="min-h-screen w-full bg-white px-8 py-20 text-gray-900 flex flex-col justify-center items-center">
      <div className="max-w-5xl mx-auto space-y-10">
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold text-center mb-10"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🔥 Why Our Forum Matters
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl leading-relaxed tracking-wide"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Lightbulb className="inline-block mr-2 text-yellow-500" />
          Our discussion forum is more than a chat room — it's a place where **coders collaborate**, **doubts are solved**, and **knowledge compounds**. Whether you're stuck in a Codeforces problem or brainstorming for a hackathon, this forum gives your voice a home.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl leading-relaxed tracking-wide"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Users className="inline-block mr-2 text-blue-600" />
          With global visibility, your posts are seen by peers and mentors alike. **It's a community playground**, where ideas, questions, and answers become permanent resources for everyone.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl leading-relaxed tracking-wide"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MessageCircleHeart className="inline-block mr-2 text-pink-500" />
          You're not just typing messages — you're **contributing to a learning ecosystem**. Get upvotes, appreciation, and even badges for impactful replies.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl leading-relaxed tracking-wide"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Rocket className="inline-block mr-2 text-indigo-600" />
          The forum will soon support features like **threaded replies**, **polls**, **post tagging**, and **problem-specific discussions**. It’s designed to grow with your community's needs.
        </motion.p>

        <motion.div
          className="text-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a
            href="#chat"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transition-all"
          >
            🚀 Jump to Live Discussion
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ForumFeatureSection;

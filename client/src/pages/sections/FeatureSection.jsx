import React from "react";

const FeatureSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-16 px-4 mx-auto max-w-screen-2xl lg:px-6">
        <div className="max-w-screen-md mb-16 text-center mx-auto">
          <h2 className="mb-6 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white lg:text-5xl">
            Built for Coders, Powered by Intelligence
          </h2>
          <p className="text-gray-600 sm:text-xl dark:text-gray-400">
            CodeClash is designed for competitive programmers, students, and professionals who demand more than just a practice platform. From AI-driven analytics to contest simulation, everything is tailored to help you grow, rank, and succeed.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "🔍 AI-Powered Analysis",
              desc: "Get instant feedback on your submissions. DoctorCP identifies weaknesses, recommends topics, and helps you improve with personalized suggestions."
            },
            {
              title: "🏁 Real-Time Contest Simulation",
              desc: "Participate in Codeforces-style contests. Timed environments, live leaderboards, and post-contest breakdowns ensure a realistic experience."
            },
            {
              title: "📚 Curated Problem Sets",
              desc: "Solve handpicked problems based on your skill level. Choose from beginner-friendly to expert-only challenges across all major topics."
            },
            {
              title: "📈 Performance Dashboard",
              desc: "Track your accuracy, average solve time, consistency, and more through beautifully visualized stats across problems and contests."
            },
            {
              title: "🤖 DoctorCP Assistant",
              desc: "Our intelligent coach detects patterns in your coding behavior and guides you through your most frequent mistakes and unbalanced topics."
            },
            {
              title: "🧠 Topic Mastery Engine",
              desc: "Master DSA topics with structured topic ladders, streak counters, and adaptive difficulty that challenges you just enough to grow."
            }
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="mb-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
                {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

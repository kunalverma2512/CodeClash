import React from "react";

const AboutSection1 = () => {
  return (
    <section className="w-full px-6 py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
  <div className="max-w-6xl mx-auto space-y-16">
    <div className="text-center">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
        We’re not just helping you code.
        <br className="hidden sm:block" />
        We’re helping you think like a pro.
      </h2>
      <p className="mt-6 text-xl sm:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto font-medium">
        Competitive programming is more than solving problems — it's about strategy,
        speed, focus, and relentless self-improvement. That’s why CodeClash integrates
        intelligent insights, adaptive recommendations, and in-depth analysis tailored
        to your unique learning curve.
      </p>
    </div>

    <div className="grid gap-12 md:grid-cols-3">
      {[
        {
          title: "📊 Personalized Analytics",
          desc: "Every submission is a step in your story. We break down your approach, track accuracy, and highlight weak zones so you know exactly where to focus next."
        },
        {
          title: "🏆 Contest Mode Like No Other",
          desc: "Simulate real Codeforces-style environments with instant feedback, rankings, and post-match analysis. Get better, faster — one contest at a time."
        },
        {
          title: "🤖 Built-in Intelligence",
          desc: "DoctorCP — our AI assistant — evaluates your performance patterns and gives feedback that feels like a coach, not a spreadsheet."
        }
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition text-left"
        >
          <h3 className="text-2xl lg:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            {item.title}
          </h3>
          <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


  );
};

export default AboutSection1;

import React from "react";

const AboutPlatform = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 sm:px-10 lg:px-24 py-16">
      <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Text Section */}
        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            About Our Competitive Programming Platform
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            This platform is your all-in-one hub for learning, competing, and excelling in competitive programming.
            Whether you're preparing for contests or improving your problem-solving skills, we’ve got everything you need.
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 text-base">
            <li>Live and virtual contests like Codeforces.</li>
            <li>Theory-rich blogs for deep conceptual understanding.</li>
            <li>Track performance with personalized analytics.</li>
            <li>Practice categorized by topic, tag, and difficulty.</li>
            <li>Earn ranks and showcase your skills.</li>
            <li>Built with passion by students, for students.</li>
          </ul>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Platform Illustration"
            className="w-full max-w-md mx-auto lg:mx-0"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutPlatform;

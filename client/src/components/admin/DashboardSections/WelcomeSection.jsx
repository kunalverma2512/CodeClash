// src/pages/admin/sections/WelcomeSection.jsx
import React from "react";

const WelcomeSection = () => {
  return (
    <section className="min-h-screen bg-blue-50 px-8 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Welcome, Admin!</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          This is your central command center. From here, you can manage contests,
          users, problems, and the overall flow of the application. As an admin, you
          hold the responsibility of maintaining the platform’s integrity, ensuring
          content quality, and upholding fair practices.
        </p>
        <p className="mt-6 text-gray-700">
          Navigate using the links in the navbar to explore different areas of control.
          This dashboard is designed to be clean, content-focused, and strictly
          restricted to verified admins.
        </p>
      </div>
    </section>
  );
};

export default WelcomeSection;

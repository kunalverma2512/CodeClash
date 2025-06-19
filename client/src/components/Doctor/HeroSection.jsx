import React from "react";

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen bg-yellow-400 text-white flex flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6">Welcome to Doctor CP</h1>
      <p className="text-xl md:text-2xl max-w-3xl mb-8">
        Your personal AI mentor for Competitive Programming. Diagnose your struggles, get expert guidance, and level up!
      </p>
      <a
        href="#form-section"
        className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-md hover:bg-blue-100 transition"
      >
        Get Diagnosed Now
      </a>
    </section>
  );
}

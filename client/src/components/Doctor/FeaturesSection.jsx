import React from "react";

const features = [
  "Overcome rating plateaus with guidance",
  "Conquer fear of new topics",
  "Manage time pressure in contests",
  "Learn how to avoid rage quitting",
  "Build a consistent CP schedule",
  "Get personalized resource links",
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-8">🩺 What Doctor CP Can Help With</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-lg text-gray-700">
          {features.map((feat, idx) => (
            <li key={idx} className="bg-blue-50 border border-blue-100 rounded-xl p-6 shadow-md">
              {feat}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

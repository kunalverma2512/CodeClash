import React from 'react';

const RecentContestsSection = () => {
  return (
    <section className="min-h-screen bg-white p-10 border-t">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">🕑 Recent Contests</h2>
        <p className="text-lg text-gray-800 mb-8">
          Monitor the most recently conducted contests and review participation statistics, problem performance, and report anomalies if any.
        </p>
        <ul className="space-y-6">
          {[
            { title: "CodeSprint 23", date: "April 14, 2025", participants: 456 },
            { title: "HackRush 1.0", date: "March 28, 2025", participants: 389 },
            { title: "Weekly Challenge #42", date: "March 21, 2025", participants: 312 }
          ].map((contest, idx) => (
            <li key={idx} className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-800">{contest.title}</h3>
              <p className="text-gray-700">📅 {contest.date}</p>
              <p className="text-gray-700">👥 Participants: {contest.participants}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RecentContestsSection;

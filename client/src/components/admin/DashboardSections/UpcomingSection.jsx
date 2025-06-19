import React from 'react';

const UpcomingContestsSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-green-900 mb-6">📅 Upcoming Contests</h2>
        <p className="text-lg text-gray-800 mb-8">
          Plan and prepare for upcoming events. This section lists scheduled contests with details that admins can finalize or adjust.
        </p>
        <div className="space-y-6">
          {[
            { title: "Summer Code Fiesta", date: "June 10, 2025", status: "Pending Approval" },
            { title: "Beginner's Blitz", date: "June 20, 2025", status: "Finalized" },
            { title: "Algo Mayhem", date: "July 1, 2025", status: "Draft" }
          ].map((contest, idx) => (
            <div key={idx} className="p-6 bg-white rounded-xl shadow-sm border border-green-200">
              <h3 className="text-2xl font-semibold text-green-800">{contest.title}</h3>
              <p className="text-gray-700">📅 Scheduled Date: {contest.date}</p>
              <p className="text-gray-700">🚦 Status: {contest.status}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingContestsSection;

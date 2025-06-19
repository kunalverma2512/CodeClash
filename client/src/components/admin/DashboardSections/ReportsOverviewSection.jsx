import React from 'react';

const ReportsOverviewSection = () => {
  return (
    <section className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">🧾 Reports Overview</h2>
        <p className="text-lg text-gray-800 mb-8">
          Access summaries of flagged content, behavioral anomalies, or submission issues reported by users and AI systems.
        </p>
        <div className="space-y-5 text-gray-700">
          <div className="p-5 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold text-red-600">Plagiarism Reports</h3>
            <p>Detected by AI: <strong>38</strong></p>
            <p>Manually reviewed: <strong>22</strong></p>
          </div>
          <div className="p-5 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold text-yellow-600">Behavior Alerts</h3>
            <p>Multiple logins / suspected bot activity: <strong>15 users</strong></p>
          </div>
          <div className="p-5 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold text-blue-600">Contest Disruptions</h3>
            <p>Server spikes, submissions delay, or unusual traffic patterns: <strong>4 contests flagged</strong></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportsOverviewSection;

import React from 'react';

const AnalyticsSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">📊 Platform Analytics</h2>
        <p className="text-lg text-gray-800 mb-8">
          Get an in-depth view of how users are engaging with the platform. Admins use this section to monitor trends and optimize experiences.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700">Daily Active Users</h3>
            <p className="text-2xl text-blue-600 mt-2">1,120</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700">Problems Solved</h3>
            <p className="text-2xl text-blue-600 mt-2">8,547</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700">Contests Held</h3>
            <p className="text-2xl text-blue-600 mt-2">52</p>
          </div>
        </div>
        <p className="mt-10 text-gray-700">
          Use these metrics to assess growth, retention, and identify popular problem areas or contest types.
        </p>
      </div>
    </section>
  );
};

export default AnalyticsSection;

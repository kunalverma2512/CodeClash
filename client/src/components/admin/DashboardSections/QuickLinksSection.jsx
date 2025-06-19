import { Link } from "react-router-dom";

const QuickLinksSection = () => {
  return (
    <section className="min-h-screen bg-white p-8">
      <h2 className="text-3xl font-semibold mb-6">Quick Links</h2>
      <div className="flex flex-wrap gap-4">
        <Link to="/admin-dashboard/create" className="px-4 py-2 bg-green-600 text-white rounded">+ Create Contest</Link>
        <Link to="/admin-dashboard/contests" className="px-4 py-2 bg-indigo-600 text-white rounded">📋 All Contests</Link>
        <Link to="/admin-dashboard/reports" className="px-4 py-2 bg-blue-600 text-white rounded">📄 Reports</Link>
        <Link to="/admin-dashboard/settings" className="px-4 py-2 bg-gray-600 text-white rounded">⚙️ Settings</Link>
      </div>
    </section>
  );
};

export default QuickLinksSection;

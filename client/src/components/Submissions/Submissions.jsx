import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCfSubmissions } from "../../services/api";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      fetchCfSubmissions(setSubmissions, setLoading);
    };

    fetchSubmissions();
  }, []);

  if (loading) return <div className="p-4">Loading submissions...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Submissions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Contest</th>
              <th className="py-2 px-4">Problem</th>
              <th className="py-2 px-4">Language</th>
              <th className="py-2 px-4">Verdict</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s, idx) => (
              <tr key={s._id} className="border-t">
                <td className="py-2 px-4">{idx + 1}</td>
                <td className="py-2 px-4">{s.problem?.contestId || "—"}</td>
                <td className="py-2 px-4">{s.problem?.title || "Unknown"}</td>
                <td className="py-2 px-4">{s.language.toUpperCase()}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      s.status=="Accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  {new Date(s.submittedAt).toLocaleString()}
                </td>
                <td className="py-2 px-4">
                  <Link
                    to={`/dashboard/submissions/${s._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {submissions.length === 0 && (
          <div className="mt-4 text-gray-500">No submissions yet.</div>
        )}
      </div>
    </div>
  );
};

export default Submissions;

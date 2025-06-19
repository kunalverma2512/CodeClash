import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSubmissionDetails } from "../../services/api";
import LoadingScreen from "../UI/LoadingScreen";

const SubmissionDetails = () => {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissionDetails(id, setSubmission, setLoading);
  }, [id]);

  if (loading) return <LoadingScreen />;
  if (!submission)
    return <div className="p-4 text-red-500">Submission not found.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Submission Result</h1>
      <p>
        <strong>Status:</strong> {submission.status}
      </p>
      <p>
        <strong>Language:</strong> {submission.language}
      </p>
      <p>
        <strong>Passed:</strong> {submission.passedCases} /{" "}
        {submission.totalCases}
      </p>

      <h2 className="mt-6 font-semibold">Testcase Results:</h2>
      <div className="space-y-4 mt-2">
        {submission.results.map((r, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded">
            <p>
              <strong>Testcase {r.testCaseNumber}</strong>
            </p>
            <p>
              <strong>Input:</strong> <pre className="inline">{r.input}</pre>
            </p>
            <p>
              <strong>Expected:</strong>{" "}
              <pre className="inline">{r.expectedOutput}</pre>
            </p>
            <p>
              <strong>Output:</strong>{" "}
              <pre className="inline">{r.userOutput}</pre>
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={r.correct ? "text-green-600" : "text-red-600"}>
                {r.status}
              </span>
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-6 font-semibold">Code:</h2>
      <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
        {submission.code}
      </pre>
    </div>
  );
};

export default SubmissionDetails;

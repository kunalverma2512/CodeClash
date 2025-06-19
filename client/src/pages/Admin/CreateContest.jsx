import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { handleCreateContest } from "../../services/api";

const CreateContest = () => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [contest, setContest] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    eligibility: "Open to all",
    tags: "",
    createdBy: "",
    evaluationMode: "auto",
    problems: [],
  });

  const handleChange = (field, value) => {
    setContest({ ...contest, [field]: value });
  };

  const addProblem = () => {
    setContest({
      ...contest,
      problems: [
        ...contest.problems,
        {
          title: "",
          statement: "",
          difficulty: "Medium",
          timeLimit: 2000,
          memoryLimit: 256,
          maxScore: 100,
          tags: "",
          examples: [{ input: "", output: "", explanation: "" }],
          testcases: [{ input: "", expectedOutput: "", isPublic: false }],
        },
      ],
    });
  };

  const updateProblem = (index, field, value) => {
    const updated = [...contest.problems];
    updated[index][field] = value;
    setContest({ ...contest, problems: updated });
  };

  const addExample = (pIndex) => {
    const updated = [...contest.problems];
    updated[pIndex].examples.push({ input: "", output: "", explanation: "" });
    setContest({ ...contest, problems: updated });
  };

  const addTestCase = (pIndex) => {
    const updated = [...contest.problems];
    updated[pIndex].testcases.push({
      input: "",
      expectedOutput: "",
      isPublic: false,
    });
    setContest({ ...contest, problems: updated });
  };

  const updateExample = (pIndex, exIndex, field, value) => {
    const updated = [...contest.problems];
    updated[pIndex].examples[exIndex][field] = value;
    setContest({ ...contest, problems: updated });
  };

  const updateTestCase = (pIndex, tcIndex, field, value) => {
    const updated = [...contest.problems];
    updated[pIndex].testcases[tcIndex][field] = value;
    setContest({ ...contest, problems: updated });
  };

  const handleSubmit = async ()=> {
    handleCreateContest(contest,user,navigate);
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Contest</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="input"
          type="text"
          placeholder="Contest Title"
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Description"
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <input
          className="input"
          type="datetime-local"
          onChange={(e) => handleChange("startDate", e.target.value)}
        />
        <input
          className="input"
          type="datetime-local"
          onChange={(e) => handleChange("endDate", e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Eligibility"
          value={contest.eligibility}
          onChange={(e) => handleChange("eligibility", e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Tags (comma-separated)"
          onChange={(e) => handleChange("tags", e.target.value)}
        />
        <select
          className="input"
          onChange={(e) => handleChange("evaluationMode", e.target.value)}
        >
          <option value="auto">Auto</option>
          <option value="manual">Manual</option>
        </select>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Problems</h2>
        {contest.problems.map((problem, index) => (
          <div key={index} className="bg-gray-50 border p-4 rounded-lg mb-6">
            <h3 className="text-xl font-medium mb-2">Problem {index + 1}</h3>

            <input
              className="input mb-2"
              placeholder="Problem Title"
              value={problem.title}
              onChange={(e) => updateProblem(index, "title", e.target.value)}
            />
            <textarea
              className="input mb-2"
              placeholder="Statement (Markdown/HTML)"
              rows={3}
              value={problem.statement}
              onChange={(e) =>
                updateProblem(index, "statement", e.target.value)
              }
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                className="input"
                type="number"
                placeholder="Time Limit (ms)"
                value={problem.timeLimit}
                onChange={(e) =>
                  updateProblem(index, "timeLimit", e.target.value)
                }
              />
              <input
                className="input"
                type="number"
                placeholder="Memory Limit (MB)"
                value={problem.memoryLimit}
                onChange={(e) =>
                  updateProblem(index, "memoryLimit", e.target.value)
                }
              />
              <input
                className="input"
                type="number"
                placeholder="Max Score"
                value={problem.maxScore}
                onChange={(e) =>
                  updateProblem(index, "maxScore", e.target.value)
                }
              />
              <select
                className="input"
                value={problem.difficulty}
                onChange={(e) =>
                  updateProblem(index, "difficulty", e.target.value)
                }
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <input
              className="input mt-2 mb-4"
              placeholder="Tags (comma separated)"
              value={problem.tags}
              onChange={(e) => updateProblem(index, "tags", e.target.value)}
            />

            {/* Examples */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Examples</h4>
              {problem.examples.map((ex, exIdx) => (
                <div
                  key={exIdx}
                  className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2"
                >
                  <input
                    className="input"
                    placeholder="Input"
                    value={ex.input}
                    onChange={(e) =>
                      updateExample(index, exIdx, "input", e.target.value)
                    }
                  />
                  <input
                    className="input"
                    placeholder="Output"
                    value={ex.output}
                    onChange={(e) =>
                      updateExample(index, exIdx, "output", e.target.value)
                    }
                  />
                  <input
                    className="input"
                    placeholder="Explanation"
                    value={ex.explanation}
                    onChange={(e) =>
                      updateExample(index, exIdx, "explanation", e.target.value)
                    }
                  />
                </div>
              ))}
              <button
                onClick={() => addExample(index)}
                className="text-blue-600 text-sm hover:underline mt-1"
              >
                + Add Example
              </button>
            </div>
            {/* Testcases */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Test Cases</h4>
              {problem.testcases.map((tc, tcIdx) => (
                <div
                  key={tcIdx}
                  className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2"
                >
                  <input
                    className="input"
                    placeholder="Input"
                    value={tc.input}
                    onChange={(e) =>
                      updateTestCase(index, tcIdx, "input", e.target.value)
                    }
                  />
                  <input
                    className="input"
                    placeholder="Expected Output"
                    value={tc.expectedOutput}
                    onChange={(e) =>
                      updateTestCase(
                        index,
                        tcIdx,
                        "expectedOutput",
                        e.target.value
                      )
                    }
                  />
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={tc.isPublic}
                      onChange={(e) =>
                        updateTestCase(
                          index,
                          tcIdx,
                          "isPublic",
                          e.target.checked
                        )
                      }
                    />
                    <span className="text-sm">Public</span>
                  </label>
                </div>
              ))}
              <button
                onClick={() => addTestCase(index)}
                className="text-blue-600 text-sm hover:underline mt-1"
              >
                + Add Test Case
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addProblem}
          className="bg-blue-100 border border-blue-500 text-blue-700 px-4 py-2 rounded hover:bg-blue-200"
        >
          + Add Problem
        </button>
      </div>

      <button onClick={handleSubmit} className="w-full bg-green-600 text-white py-3 text-lg rounded mt-8 hover:bg-green-700">
        🚀 Submit Contest
      </button>
    </div>
  );
};

export default CreateContest;

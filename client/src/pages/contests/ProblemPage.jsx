import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LanguageSelector from "../../components/Contests/LanguageSelector";
import CodeEditor from "../../components/Contests/CodeEditor";
import ProblemDetails from "../../components/Contests/ProblemDetails";
import { fetchSingleProblemById, HandleSubmitProblem } from "../../services/api";
import SubmissionFailed from "../../components/UI/SubmissionFailed";
import { Loader2, SendHorizonal } from "lucide-react";
import AIChat from "../../components/AIFeaturesProblemPage/AIChat";

const ProblemPage = () => {

  const { pid } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProblem = async () => {
      try {
        const data = await fetchSingleProblemById(pid);
        setProblem(data);
      } catch (err) {
        setError("Failed to fetch problem data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProblem();
  }, [pid]);

  const handleCodeChange = (value) => {
    setCode(value || "");
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    HandleSubmitProblem(setResult, setError, code, selectedLanguage, pid,setIsSubmitting);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg text-gray-600">
        Loading problem...
      </div>
    );
  }

  return (
    <>
    <div className="w-full h-[91.9vh] flex flex-col lg:flex-row bg-gray-100 font-inter">
      {/* LEFT: Problem & Info */}
      <div className="w-full lg:w-2/5 h-1/2 lg:h-full overflow-y-auto p-6 bg-white border-r border-gray-200 shadow-inner">
        <ProblemDetails problem={problem} />

        <div className="mt-6">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={handleLanguageChange}
          />
        </div>

        {result && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              Submission Result:
            </h3>
            <pre className="bg-gray-200 text-gray-800 p-3 rounded-md text-sm max-h-60 overflow-y-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* RIGHT: Code Editor */}
      <div className="w-full lg:w-3/5 h-3/4 lg:h-full overflow-y-auto p-6 bg-gray-50 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Write Your Code
        </h2>
        <CodeEditor
          code={code}
          onCodeChange={handleCodeChange}
          language={selectedLanguage}
        />
        {/* <AIAssistantChat code={code} pid={pid} /> */}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mt-4 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-2 rounded-lg self-start flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Submitting...
            </>
          ) : (
            <>
              <SendHorizonal size={18} /> Submit
            </>
          )}
        </button>
      </div>
      

      {/* {error && <SubmissionFailed message={error} />} */}
    </div>
    <AIChat code={code} language={selectedLanguage} />
    </>
  );
};

export default ProblemPage;

import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, onCodeChange, language }) => {
  return (
    <div className="w-full bg-white shadow-md rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <h2 className="text-lg font-semibold text-gray-800">
          ✍️ Write Your Solution
        </h2>
        <span className="text-sm text-gray-500 capitalize">
          Language: <strong>{language}</strong>
        </span>
      </div>

      {/* Editor */}
      <div className="overflow-hidden rounded-b-lg">
        <Editor
          height="520px"
          language={language === "cpp" ? "cpp" : language}
          value={code}
          onChange={(value) => onCodeChange(value)}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            fontFamily: "Fira Code, monospace",
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
